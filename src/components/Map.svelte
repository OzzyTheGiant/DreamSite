<div id="map" class="h-96"></div>

<script lang="ts">
// BUG https://github.com/Leaflet/Leaflet/issues/4968
import { onMount } from "svelte"
import L, { type TileLayerOptions } from "leaflet"
import type { MapLocation } from "@/store/locations"
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import { $currentLocation as currentLocation } from "@/store/locations"

export let locations: { [key: string]: MapLocation }
export let onPan: CallableFunction | undefined = undefined

let map: L.Map
let markers: { [key: string]: L.Marker }

$: $currentLocation && switchLocation()

function panMapView(): void {
  if ($currentLocation) map.setView($currentLocation.coordinates, 16)
}

export function switchLocation(): void {
  panMapView()
  if (onPan) onPan()
  document.getElementById("map")!.scrollIntoView();
}

onMount(() => {
  map = L.map('map', { scrollWheelZoom: false })
  currentLocation.set(Object.values(locations)[0])
  
  L.Marker.prototype.options.icon = L.icon({
      iconRetinaUrl: iconRetinaUrl.src,
      iconUrl: iconUrl.src,
      shadowUrl: shadowUrl.src,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
  })
  
  L.marker($currentLocation!.coordinates).addTo(map)

  markers = Object.keys(locations).reduce((markers, key) => {
    return { ...markers, [key]: L.marker(locations[key].coordinates).addTo(map) }
  }, {})
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 16,
    minZoom: 10,
    test: Math.random(),
    maximumAge: -1,
    id: "ozzythegiant/ck6gmgfdr2wix1irx73e39p2k", // username/style-id
    accessToken: import.meta.env.PUBLIC_MAPBOX_API_KEY
  } as TileLayerOptions).addTo(map)
  
  panMapView()
  
  window.addEventListener("resize", panMapView)
})
</script>
