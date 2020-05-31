import { autoinject } from "aurelia-framework";
import {PoiService} from "../services/poi.service";
import {Location, Poi} from "../services/poi-types";
import { LeafletMap } from "../services/leaflet-map";
import {inject} from "aurelia-framework";

@inject(PoiService)
export class newPoi {
  title = "Single POI View";
  mapId = "single-poi-map";
  map: LeafletMap;
  mapHeight: 200;
  mapConfig = {
    minZoom: 1,
      location: { lng: -7.7783203, lat: 53.2734 },
      zoom: 8,


  };

  pois: Poi[];
  location:Location[];
  poi: Poi;




  constructor(private ds: PoiService) {
  }

  renderPoi(poi: Poi) {
    if (this.map) {
      this.map.moveTo(17, this.poi.location);
      const poiStr = `${poi.Off_Name}`;
      this.map.addMarker(poi.location, poiStr, 'National Schools')
      this.map.invalidateSize();
    }
  }


//Get the id of the singlePoi to show
  async activate(params) {
    const poiId = params.id;
    const poi = await this.ds.getSinglePois(poiId)
    this.poi = poi;

  }


  attached() {
    this.map = new LeafletMap("single-poi-map",this.mapConfig,'Terrain')
    this.map.showZoomControl();
    this.map.addLayerGroup('National Schools');
    this.map.showLayerControl();
    if (this.poi) {
      this.renderPoi(this.poi);
    }
  }



}
