import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";

@inject(PoiService)
export class PoiForm {
  /*@bindable
  paymentMethods: string[];
  @bindable
  candidates: Candidate[];

  amount = '0';
  selectedMethod = '';
  selectedCandidate : Candidate = null;
*/
  constructor (private ds: PoiService) {}

  addPoi() {

    //this.ds.donate(parseInt(this.amount), this.selectedMethod, this.selectedCandidate);
  }

}
