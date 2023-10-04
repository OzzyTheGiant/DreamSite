import type { LatLngExpression } from "leaflet"
import { atom } from "nanostores"

export interface MapLocation {
  coordinates: LatLngExpression
  address: {
    street: string
    cityLine: string
    phone: string
  }
}

export const $currentLocation = atom<MapLocation | null>(null)
