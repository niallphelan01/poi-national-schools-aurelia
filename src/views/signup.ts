import { inject } from 'aurelia-framework';
import { PoiService } from '../services/poi.service';
import { PLATFORM } from 'aurelia-pal';

@inject(PoiService)
export class Signup {
  firstName = 'Marge';
  lastName = 'Simpson';
  email = 'marge@simpson.com';
  password = 'secret';
  prompt = '';

  constructor(private ds: PoiService) {}

  async signup() {
    console.log(`Trying to sign up ${this.email}`);
    try {
      const success =  await this.ds.signup(this.firstName, this.lastName, this.email, this.password);
      if(success.isSuccess){ //check to see if the HTTP response was successful
        this.prompt ="Successful Signup";
        const newUser= success.content;
        this.ds.users.set(newUser.email, newUser);
        this.ds.usersById.set(newUser._id, newUser);
        this.ds.changeRouter(PLATFORM.moduleName('start'))
      }

      }
    catch(err){
      this.prompt = err.response;
    }
  }
}
