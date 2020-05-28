import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';
import { Poi } from '../../services/poi-types';


export class PoiMap {
  mapId = 'poi-map';
  mapHeight = 300;
  map: LeafletMap;


  constructor(private ea: EventAggregator) {}

  attached() {
    const mapConfig = {
      location: { lat: 53.2734, lng: -7.7783203},
      zoom: 8,
      minZoom: 7,
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');


  }
  renderPoi(poi: Poi) {
    if (this.map) {
      const poiStr = `${poi.Off_Name}`;
      this.map.addMarker(poi.location, poiStr);
      this.map.moveTo(12, poi.location);
    }
  }
}
