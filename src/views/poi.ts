import { inject } from 'aurelia-framework';
import { Poi } from '../services/poi-types';
import { Location } from '../services/poi-types';
import { PoiService } from '../services/poi.service';

//TODO: Add functionality to view a singular POI page with all fields.

@inject(PoiService)
export class newPoi {
  pois: Poi[];
  location:Location[];



  async activate(params, route) {
    this.pois = await this.ds.getPois()
    this.location=await this.ds.getLocations()
    console.log (this.pois);
    console.log (this.location)
  }


  constructor(private ds: PoiService) {
   this.pois = ds.pois;


     }

}
