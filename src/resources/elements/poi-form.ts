import { inject } from 'aurelia-framework';
import { bindable } from 'aurelia-framework';
import { Poi, Location, User } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";

//TODO: Add the functionality to add a new POI with location etc
@inject(PoiService)
export class PoiForm {
  _id: string; AIRO_ID : number; Roll_No : string;
  Off_Name: string; Add_1: string; Add_2: string; Add_3: string; Add_4: string;
  County: string; Ethos: string; Island: string; DEIS: string; Gaeltacht: string;
  M_13_14: number; F_13_14: number; T_13_14: number; xcoord: number;
  ycoord: number; Region: string; cloudinary_public_id: string;
  cloudinary_public_secure_url: string;


  // @ts-ignore
  location: Location = {lat: 53.2734, lng: -7.7783203 };
  userUpdated: User;




  constructor (private ds: PoiService) {}


  async addPoi() {

    let locationId = await this.ds.createLocation(this.location.lat, this.location.lng)

    this.ds.createPoi(this.AIRO_ID, this.Roll_No, this.Off_Name, this.Add_1, this.Add_2, this.Add_3, this.Add_4, this.County,
      this.Ethos, this.Island, this.DEIS,this.Gaeltacht, this.M_13_14, this.F_13_14, this.T_13_14, this.xcoord, this.ycoord, locationId,
      this.cloudinary_public_secure_url, this.cloudinary_public_id,  this.Region)


  }

}
