import {PoiService} from "../../services/poi.service";
import { autoinject } from "aurelia-framework";
import { Poi } from "../../services/poi-types";

@autoinject
export class CoastsSidebar {
  pois: Poi[];

  constructor(private ds: PoiService ) {
    this.loadPois()
  }

  async loadPois() {
    this.pois = await this.ds.getPois();
  }
}
