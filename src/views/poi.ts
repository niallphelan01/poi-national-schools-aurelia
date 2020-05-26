import { inject } from 'aurelia-framework';
import { Poi } from '../services/poi-types';
import {  PoiService } from '../services/poi.service';

@inject(PoiService)
export class newPoi {
  pois: Poi[];


  async activate(params, route) {

    this.pois = await this.ds.getPois()
    console.log (this.pois);
  }


  constructor(private ds: PoiService) {
   this.pois = ds.pois;

    //this.donations = ds.donations;
    //this.paymentMethods = ds.paymentMethods;
    //this.total = ds.total;
  }

}
