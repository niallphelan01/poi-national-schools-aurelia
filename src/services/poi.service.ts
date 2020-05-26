import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Poi, RawPoi, User } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
//import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  pois: Poi[] = [];

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getUsers();

  }
/*
  async getCandidates() {
    const response = await this.httpClient.get('/api/candidates');
    this.candidates = await response.content;
    console.log(this.candidates);
  }
*/

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
      this.usersById.set(user._id, user);
    });
    console.log(users);
  }
  async getPois(){
    const response = await this.httpClient.get('/api/pois');
    this.pois = await  response.content;
    console.log("Poi information")
    console.log(this.pois);
    return this.pois;
  }
  /*
  async getPois() {
  const response = await this.httpClient.get('/api/pois');
  const rawPois : RawPoi[] = await response.content;
      rawPois.forEach(rawPoi => {
      const poi = {
        _id: rawPoi._id,
        AIRO_ID: rawPoi.AIRO_ID,
        Roll_No:rawPoi.Roll_No,
        Off_Name: rawPoi.Off_Name,
        Add_1: rawPoi.Add_1,
        Add_2:rawPoi.Add_2,
        Add_3:rawPoi.Add_3,
        Add_4:rawPoi.Add_4,
        County: rawPoi.County,
        Ethos: rawPoi.Ethos,
        Island: rawPoi.Island,
        DEIS: rawPoi.DEIS,
        Gaeltacht: rawPoi.Gaeltacht,
        M_13_14: rawPoi.M_13_14,
        F_13_14: rawPoi.F_13_14,
        T_13_14: rawPoi.T_13_14,
        xcoord: rawPoi.xcoord,
        ycoord: rawPoi.ycoord,
        Long: rawPoi.Long,
        Lat: rawPoi.Lat,
        Region: rawPoi.Region,
        userUpdated: rawPoi.userUpdated,
      };

      this.pois.push(poi);
      console.log(poi);
    });

  }
*/

  async createPoi(AIRO_ID: number) {
    console.log("test");
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    this.users.set(newUser.email, newUser);
    this.usersById.set(newUser._id, newUser);
    this.changeRouter(PLATFORM.moduleName('app'))
    return false;
  }

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      await this.getPois();
      this.changeRouter(PLATFORM.moduleName('app'))
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'))
  }

  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }
}
