export default class Map {
  element;

  config;

  instance;

  constructor(element, mapOptions) {
    const defaultConfig = {
      icon: {
        url: null,
        size: [150, 150],
        offset: [-10, -10]
      },
      center: [55.76, 37.64],
      zoom: 7,
      controls: []
    }

    this.element = element
    this.config = Object.assign(defaultConfig, mapOptions)
    this.instance = this._initMap()
  }
  
  _initMap() {
    const instance = new window.ymaps.Map(this.element, {
      center: this.config.center,
      zoom: this.config.zoom,
      controls: this.config.controls
    });
    
    instance.behaviors.disable('scrollZoom');
    
    return instance;
  }
  
  addPlace(coords) {
    const placemarkProperties = {};
    
    const placemarkOptions = {
      iconLayout: 'default#image',
      iconImageHref: this.config.icon.url,
      iconImageSize: this.config.icon.size,
      iconImageOffset: this.config.icon.offset
    };
    
    const placemark = new window.ymaps.Placemark(coords, placemarkProperties, placemarkOptions);
    
    this.instance.geoObjects.add(placemark);

    return placemark;
  }
}
