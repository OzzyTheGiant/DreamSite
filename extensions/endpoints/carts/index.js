// @ts-check
/** @typedef {import("express").Router} Router */
/** @typedef {import("express").Request} Request */
/** @typedef {import("express").Response} Response */
/** @typedef {import("knex").Knex} Knex */
/** @typedef {import("./Cart").Cart} Cart */
/** @typedef {import("./Order").OrderItem} OrderItem */
/** @typedef {import("./Product").Product} Product */
/** @typedef {import("./Product").ProductVariation} ProductVariation */
/** @typedef {import("./Product").ProductStyle} ProductStyle */

const cookieOptions = {
  httpOnly: true,
  domain: process.env.COOKIE_DOMAIN,
  expires: new Date(Date.now() + (parseInt(process.env.CART_SESSION_TIME ?? "43200000"))),
  secure: process.env.APP_ENV === "production"
}

class HttpError extends Error {
  /**
   * @param {string} message
   * @param {number} code - HTTP Status Code
   */

  constructor(message, code) {
    super(message)
    this.code = code
  }
}

/** Registers Cart synchronization endpoints for E-Commerce operations
 * @param {Router} router - Express Router
 * @param {{ [key: string]: any }} context - Directus context object
 */
export default function registerCartEndpoints(router, context) {
  router.all("/", async (req, res) => await manageCart(req, res, context))
}

/**
 * Fetch user's Cart data after updating it for any product changes
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {{ [key: string]: any }} context - Directus context object
 */
async function manageCart(request, response, context) {
  const cartID = request.cookies.cart

  try {
    let { cart, message } = await synchronizeCart(cartID, context.database)

    switch (request.method) {
      case "POST":
        cart = await synchronizeProductData(request.body, cart, context)
        break
      case "PUT":
        cart = cart.filter(item => 
          item.product_id !== request.body.product_id ||
          item.product !== request.body.product ||
          item.variation !== request.body.variation ||
          item.style !== request.body.style
        )

        if (!message) message = "product_removed"
        break
      default: break
    }

    await context.database("carts")
      .where("id", cartID)
      .update({ products: JSON.stringify(cart), last_accessed: Date.now() })

    response.cookie("cart", cartID, cookieOptions).json({ cart, message })
  } catch (error) {
    // @ts-ignore
    const { code, message, status } = error
  
    if (message === "cart_not_found") {
      const cart = await createCart(context)

      return response
        .cookie("cart", cart.id, cookieOptions)
        .json({ cart: cart.products, message: null })
    }

    if (["product_not_found", "variant_not_found"].indexOf(message) >= 0) {
      return response.status(code).json({ message })
    }

    console.error(error)
    return response.status(code ?? status ?? 500).json({ message })
  }
}

/** Creates new Cart in database
 * @param {{ [key: string]: any }} context - Directus context object
 * @returns {Promise<Cart>}
 */
async function createCart(context) {
  const { ItemsService } = context.services

  const itemsService = new ItemsService("carts", {
    schema: await context.getSchema(),
    accountability: null
  })

  /** @type string */
  const cartID = await itemsService.createOne({})
  return itemsService.readOne(cartID)
}

/**
 * Update Cart according to current Product data in database
 * @param {string} id - The Cart's ID
 * @param {Knex} database - A Knex query builder instance
 */
async function synchronizeCart(id, database) {
  if (!id) throw new HttpError("cart_not_found", 404)

  /** @type Cart */
  let cart = await database("carts").where("id", id).first()
  /** @type OrderItem[] */
  let syncedCart = []
  let updatedCart = false
  /** @type string | null */
  let message = null

  if (!cart) throw new HttpError("cart_not_found", 404);

  for (const item of JSON.parse(cart.products)) {
    /** @type Product */
    const product = await database("products").where("id", item.product_id).first()
    /** @ts-ignore @type ProductVariation[] */
    const variations = JSON.parse(product.variations)
    /** @ts-ignore @type ProductStyle[] */
    const styles = JSON.parse(product.styles)

    if (!product) {
      updatedCart = true
      message = "cart_items_removed"
      continue
    }

    const selectedVariation = item.variation ? 
      variations.find(variation => variation.variation_name === item.variation) :
      null

    const selectedStyle = item.style ? styles.find(style => style.style_name === item.style) : null

    if (selectedVariation === undefined || selectedStyle === undefined) {
      updatedCart = true
      message = "cart_items_removed"
      continue
    }

    const price = selectedVariation?.price ?? product.price_default

    if (product.title !== item.product || price !== item.price) {
      Object.assign(item, { price, title: product.title })
      updatedCart = true
    }

    syncedCart.push(item)
  }

  if (updatedCart) {
    database("carts").where("id", id).update("products", JSON.stringify(syncedCart))
  }

  return { cart: syncedCart, message }
}

/**
 * Check that submitted product data still exists in database and if so, add to cart if not in cart,
 * else update quantity and price
 * 
 * @param {OrderItem} item - The Order Item's data that was submitted in the web request
 * @param {OrderItem[]} cart - The current cart product list
 * @param {{ [key: string]: any }} context - Directus context object
 * @returns {Promise<OrderItem[]>} - The updated cart product list to be saved later
 */
async function synchronizeProductData(item, cart, context) {
  /** @type Product */
  const product = await context.database("products").where("id", item.product_id).first()

  if (!product) throw new HttpError("product_not_found", 404)

  /** @ts-ignore @type ProductVariation[] */
  const variations = JSON.parse(product.variations)
  /** @ts-ignore @type ProductStyle[] */
  const styles = JSON.parse(product.styles)
  
  const selectedVariation = item.variation ? 
      variations.find(variation => variation.variation_name === item.variation) :
      null

  const selectedStyle = item.style ? styles.find(style => style.style_name === item.style) : null

  if (selectedVariation === undefined || selectedStyle === undefined) {
    throw new HttpError("variant_not_found", 404)
  }

  // at this point, the product and the selected variation and style are guaranteed to exist
  // so now check that the submitted order item is in cart
  const index = cart.findIndex(cartItem => (
    cartItem.product_id === item.product_id &&
    cartItem.variation === item.variation &&
    cartItem.style === item.style
  ))

  if (index >= 0) {
    cart[index].quantity = item.quantity + cart[index].quantity
    cart[index].price = selectedVariation?.price ?? product.price_default
  } else cart.push(item)

  return cart
}
