import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";

//TODO: Add the functionality to add a new POI with location etc
@inject(PoiService)
export class PoiForm {
  _id: string;
  AIRO_ID : number;
  Roll_No : string;
  Off_Name: string;
  Add_1: string;
  Add_2: string;
  Add_3: string;
  Add_4: string;
  County: string;
  Ethos: string;
  Island: string;
  DEIS: string;
  Gaeltacht: string;
  M_13_14: number;
  F_13_14: number;
  T_13_14: number;
  xcoord: number;
  ycoord: number;
  Long: number;
  Lat: number;
  Region: string;
  userUpdated: string;
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
    this.ds.createPoi(this.AIRO_ID);

  }

}
