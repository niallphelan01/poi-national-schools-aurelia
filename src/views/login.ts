import { inject } from 'aurelia-framework';
import { PoiService } from '../services/poi.service';

@inject(PoiService)
export class Login {
  email = 'admin@test.com';
  password = '$2b$10$pkaH1uQVl3.AaDz0DE.3..HnvdntD5EVNCa9gkZ5J3ZTivULJenyy';
  prompt = '';

  constructor(private ds: PoiService) {}

  async login(e) {
    console.log(`Trying to log in ${this.email}`);
    const success = await this.ds.login(this.email, this.password);
    if (!success) {
      this.prompt = "Oops! Try again...";

    }
  }
}
