import { inject } from 'aurelia-framework';
import { PoiService } from '../services/poi.service';
import {User} from "../services/poi-types";

@inject(PoiService)
export class editUsers {
user: User;

  constructor(private ds: PoiService) {
  }


  updateUser() {
    alert("You are updating the User");
    const response = this.ds.updateUser(this.user);


  }
  async activate() {
    this.user = this.ds.currentUser;
    console.log("user details");
    console.log(this.user);

  }


}
