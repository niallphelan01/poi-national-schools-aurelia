import { inject } from 'aurelia-framework';
import { Poi } from '../services/poi-types';
import { Location } from '../services/poi-types';
import { PoiService } from '../services/poi.service';

@inject(PoiService)
export class newPoi {
  pois: Poi[];
  location:Location[];


  async activate(params, route) {
    this.pois = await this.ds.getPois()
    this.location=await this.ds.getLocations()
    console.log (this.pois);
  }


  constructor(private ds: PoiService) {
   this.pois = ds.pois;


    //this.donations = ds.donations;
    //this.paymentMethods = ds.paymentMethods;
    //this.total = ds.total;
  }

}
