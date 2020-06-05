import {bindable, inject} from 'aurelia-framework';
import { PoiService } from '../services/poi.service';
import {User} from "../services/poi-types";


@inject(PoiService)
export class SuperAdmin {
  //@bindable
  users: User[];
  prompt;

  constructor(private ds: PoiService) {
    //this.users = this.ds.usersArray;
    // this.users = this.ds.usersArray;
    this.users = this.ds.usersArray;
  }

  async activate() {
    var users = [];
    const response = await this.ds.users.forEach(Users => {
      users.push(Users);   //create an array of users
    });
    this.users = users;
  }

  deleteUser(index) {
    const user = this.users[index];
    if (user.level === 'basic' || user.level === 'admin') {
      console.log(user._id);
      const response = this.ds.deleteUser(user);
      const responseSplice = this.ds.usersArray.splice(index, 1);
      console.log(response);
      this.ds.getUsers();
      this.users = this.ds.usersArray;
    } else
      this.prompt = "Super Admin users cant be deleted";
  }

  upgradeUser(index) {
    try {
      const user = this.users[index];
      if (user.level === 'basic') {
        user.level = 'admin';
        alert(user.level);
        const response = this.ds.updateUser(user);
      } else if (user.level === 'admin') {
        user.level = 'superAdmin'
        alert(user.level);
        const response = this.ds.updateUser(user);
      } else
        alert('already SuperAdmin')
    } catch (err) {
      alert(err);
    }
  }

  downgradeUser(index) {
    try {
      const user = this.users[index];
      if (user.level === 'admin') {
        user.level = 'basic';
        alert(user.level);
        const response = this.ds.updateUser(user);
      } else if (user.level === 'superAdmin') {
        user.level = 'admin'
        alert(user.level);
        const response = this.ds.updateUser(user);
      } else
        alert('already basic')
    } catch (err) {
      alert(err);
    }
  }


  deleteAllUsers = () => {
    const response = this.ds.deleteAllUsers(); //call function in poi service to delete all users
  }

  deleteAllPoi = () =>{
    const response = this.ds.deleteAllPoi(); //call function in the poi service to delete all pois and locations
    alert ("Request has been sent to delete all National schools and location information");
  }
}



