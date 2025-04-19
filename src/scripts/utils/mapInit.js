import Map from "./map";
import fetchingJson from "./fetchingJSON";

export default function connectMap() {
  if(!window.ymaps) return
  const map = document.querySelectorAll(".js-map")
  
  function initMap() {
    map?.forEach(async (elementMap) => {
      const jsonPath = elementMap?.dataset.json
      const zoom = Number(elementMap?.dataset.zoom)
      const mapIconPath = elementMap?.dataset.icon
      const mapCenter = elementMap?.dataset.center.split(", ")
      const mapCoordinates = await fetchingJson(jsonPath)
      
      const isMapCenterExists = mapCenter.length !== 1 ? mapCenter : [55.786430, 49.124335]
      const isZoomExists = zoom ? zoom : 5
      
      setMapOptions(elementMap, {
        zoom: isZoomExists,
        mapCenter: isMapCenterExists,
        mapIconPath,
        mapCoordinates,
      })
    })
  }
  
  function setMapOptions(map, options) {
    const {
      zoom,
      mapCoordinates,
      mapCenter,
      mapIconPath
    } = options
    
    const yMap = new Map(map, {
      zoom: zoom,
      center: mapCenter,
      icon: {
        url: mapIconPath,
        size: [70, 70],
        offset: [-30, -60]
      }
    })
    
    mapCoordinates?.forEach((item) => {
      const coordinate = item?.coords.split(", ")
      yMap.addPlace(coordinate)
    })
  }
  
  return window.ymaps.ready(() => initMap())
}
