import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Poi, RawPoi, User, Location } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
//import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  pois: Poi[] = [];
  locations: Location[] = [];
  currentUser: User ;

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getUsers();
    this.getLocations();

  }
/*
  async getCandidates() {
    const response = await this.httpClient.get('/api/candidates');
    this.candidates = await response.content;
    console.log(this.candidates);
  }
*/
  async createPoi( AIRO_ID : number, Roll_No : string, Off_Name: string, Add_1: string, Add_2: string,
                  Add_3: string, Add_4: string, County: string, Ethos: string, Island: string, DEIS: string,
                  Gaeltacht: string, M_13_14: number, F_13_14: number, T_13_14: number, xcoord: number,
                  ycoord: number, location: string, cloudinary_public_secure_url: string,
                   cloudinary_public_id: string,Region: string,) {
    const poi = {
      AIRO_ID : AIRO_ID,
      Roll_No : Roll_No,
      Off_Name: Off_Name,
      Add_1: Add_1,
      Add_2: Add_2,
      Add_3: Add_3,
      Add_4: Add_4,
      County: County,
      Ethos: Ethos,
      Island: Island,
      DEIS: DEIS,
      Gaeltacht: Gaeltacht,
      M_13_14: M_13_14,
      F_13_14: F_13_14,
      T_13_14: T_13_14,
      xcoord: xcoord,
      ycoord: ycoord,
      location: location,
      Region: Region,
      userUpdated: this.currentUser._id,
      cloudinary_public_id: cloudinary_public_id,
      cloudinary_public_secure_url: cloudinary_public_secure_url,
    };
    //TODO: get the current logged in user and apply to the api string
    const response = await this.httpClient.post('/api/users/' + this.currentUser._id + '/pois', poi);
    // @ts-ignore
    this.pois.push(poi);
  }

  async createLocation(lat: number , lng: number) {
    const location = {
      lat:lat,
      lng: lng,
    };
    const response = await this.httpClient.post('/api/locations', location);
    const newLocations = await response.content;
    let number = this.locations.push(newLocations);
    return newLocations._id;
  }

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
  async getSinglePois(id){   //get the single Poi using ID
    const singlePoi = this.pois.find(id)
    return singlePoi;
  }
  async getLocationById(locationId){
    const location = this.locations.find(locationId)
    return location;
  }
  async getLocations(){
    const response = await this.httpClient.get('/api/locations');
    this.locations = await  response.content;
    console.log("Poi location information")
    console.log(this.locations);
    return this.locations;
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
      this.currentUser = user;  //assign the user to a global variable of currentUser as this is needed when creating a poi
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
