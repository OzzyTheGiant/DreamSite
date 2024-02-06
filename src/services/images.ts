import type { HTMLImgAttributes } from "svelte/elements"
import type { ProductStyle, PublicFile } from "@/models/Product"

export function getImageURL(image: PublicFile, baseURL: string): string {
  if (!image) return "https://placehold.co/768x768?text=DreamCraft"

  const filename = image.filename_disk.split(".")[1]
  return `${baseURL}/assets/${image.id}/${image.title}.${filename[1]}`
}

export function getCarouselImages(
  baseURL: string,
  images: PublicFile[],
  style?: ProductStyle
): HTMLImgAttributes[] {
  const placeholder = [{
    src: "https://placehold.co/640x640?text=Sweet+Coralice",
    width: 640,
    height: 480,
    alt: "placeholder"
  }]

  if (style) {
    const styleImage = images.find(
      image => image.title.toLowerCase().includes(style.style_name.toLowerCase())
    )

    if (!styleImage) return placeholder

    return [{ src: baseURL + "/assets/" + styleImage?.filename_disk, alt: styleImage?.title }]
  }

  return images.map(
    image => ({ src: baseURL + "/assets/" + image.filename_disk, alt: image.title })
  )
}
