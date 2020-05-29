import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';
import { Poi } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";
import {inject} from "aurelia-framework";

@inject(PoiService)
export class PoiMap {
  mapId = 'poi-map';
  mapHeight = 600;
  map: LeafletMap;

//private ea: EventAggregator,
  constructor( private ds: PoiService) {}
  renderPois() {
    for (let poi of this.ds.pois) {
      const poiStr = `${poi.Off_Name}`;
      this.map.addMarker(poi.location, poiStr, 'National Schools');
    }
  }

  attached() {
    const mapConfig = {
      location: { lat: 53.2734, lng: -7.7783203},
      zoom: 2,
      minZoom: 7,
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
    this.map.showZoomControl();
    this.map.addLayerGroup('National Schools');
    this.map.showLayerControl();
    this.renderPois();
  }
  renderPoi(poi: Poi) {
    if (this.map) {
      const poiStr = `${poi.Off_Name}`;
      this.map.addMarker(poi.location, poiStr);
      this.map.moveTo(2, poi.location);
    }
  }
}
