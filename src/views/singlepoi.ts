import {inject} from "aurelia-framework";
import {PoiService} from "../services/poi.service";
import {Location, Poi} from "../services/poi-types";

@inject(PoiService)
export class newPoi {
  pois: Poi[];
  location:Location[];



  async activate(params, route) {
    this.pois = await this.ds.getPois()
   // this.location=await this.ds.getLocations()

  }


  constructor(private ds: PoiService) {
    this.pois = ds.pois;

  }

}
