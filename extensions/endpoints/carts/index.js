// @ts-check
/** @typedef {import("express").Router} Router */
/** @typedef {import("express").Request} Request */
/** @typedef {import("express").Response} Response */
/** @typedef {import("knex").Knex} Knex */
/** @typedef {import("./Cart").Cart} Cart */
/** @typedef {import("./Order").OrderItem} OrderItem */
/** @typedef {import("./Product").Product} Product */

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
  router.all("/:product_id?", async (req, res) => await manageCart(req, res, context))
}

/**
 * Fetch user's Cart data after updating it for any product changes
 * @param {Request} request - Express request object
 * @param {Response} response - Express response object
 * @param {{ [key: string]: any }} context - Directus context object
 */
async function manageCart(request, response, context) {
  try {
    let cartID = request.signedCookies.cart
    let { cart, message } = await synchronizeCart(cartID, context.database)

    switch (request.method) {
      case "POST": 
        cart.push(request.body)
      case "PUT":
        const index = cart.findIndex(item => item.product_id === request.body.product_id)
        if (index >= 0) cart = cart.splice(index, 1, request.body)
      case "DELETE":
        cart = cart.filter(item => item.id !== request.body.product_id)
      default: break
    }

    await context.database("cart").where("id", cartID).update({
      products: cart,
      last_updated: new Date().toISOString()
    })

    response.cookie("cart", cartID, {
      httpOnly: true,
      signed: true,
      expires: new Date(Date.now() + (parseInt(process.env.CART_SESSION_TIME ?? "43200000"))),
      secure: process.env.APP_ENV === "production"
    }).json({ cart, message })
  } catch (error) {
    if (error.message === "cart_not_found") {
      const { ItemsService } = context.services
      const itemsService = new ItemsService("cart", { 
        schema: await context.getSchema(),
        accountability: null
      })

      /** @type Cart */
      const cart = itemsService.createOne({})
      
      return response.json(cart.products)
    }
    
    return response.status(error.status).json({ message: error.message })
  }
}

/**
 * Update Cart according to current Product data in database
 * @param {string} id - The Cart's ID
 * @param {Knex} database - A Knex query builder instance
 */
async function synchronizeCart(id, database) {
  /** @type OrderItem[] */
  let cart = await database("carts").where({ id }).first()
  /** @type OrderItem[] */
  let syncedCart = []
  let updatedCart = false
  /** @type string | null */
  let message = null

  if (!cart) throw new HttpError("cart_not_found", 404);

  for (const item of cart) {
    /** @type Product */
    const product = await database("products").where({ id: item.product_id }).first()

    if (!product) {
      updatedCart = true
      message = "cart_items_removed"
      continue
    }

    const selectedVariation = item.variation ? 
      product.variations.find(variation => variation.variation_name === item.variation) :
      null

    const selectedStyle = item.style ?
      product.styles.find(style => style.style_name === item.style):
      null

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
    database("carts").where("id", id).update("products", syncedCart)
  }

  return { cart: syncedCart, message }
}
