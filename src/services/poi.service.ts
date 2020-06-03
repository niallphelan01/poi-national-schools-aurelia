import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Poi, RawPoi, User, Location } from './poi-types';
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {config} from "@fortawesome/fontawesome-svg-core";
//import { TotalUpdate } from './messages';

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class PoiService {
  users: Map<string, User> = new Map();
  usersById: Map<string, User> = new Map();
  usersArray: User[] = [];
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
    this.usersArray = users;
    console.log("Users listing");
    console.log(users);
  }
  async getPois(){
    const response = await this.httpClient.get('/api/pois');
    this.pois = await  response.content;
    console.log("Poi information")
    console.log(this.pois);
    return this.pois;
    console.log(this.pois);
  }
  async sendImageCloudinary(formData,poi){
   const cloudinary = new HttpClient();     //creation of a new instance of httpclient to post to cloudinadt
     cloudinary.configure(http => {
          http.withBaseUrl('https://api.cloudinary.com/v1_1/dcswkfi6w/');
       })
    try{
       //formData includes the file and details
      const response =  await cloudinary.post('image/upload/',formData);
       console.log(response.content)
       console.log(response.content.secure_url);
       console.log (poi.cloudinary_secure_url);
       console.log(response.content.public_id);
       console.log(poi.cloudinary_public_id);
       poi.cloudinary_secure_url = response.content.secure_url;
       poi.cloudinary_public_id = response.content.public_id;
      console.log(poi._id);
      this.httpClient.configure( http =>{
        http.withBaseUrl('http://localhost:3000');
      });
      const updateResponse = await this.httpClient.put('api/pois/'+ poi._id , poi)
      console.log(updateResponse);
      return response.content;
    }
    catch(e){
       console.log(e)
    }

  }

  async getSinglePois(id){   //get the single Poi using ID
    const singlePoi = this.pois.find(e => e._id === id)
    https://riptutorial.com/typescript/example/29544/finding-object-in-array
    return singlePoi;
  }



  async getLocationById(locationId){
    const location = this.locations.find(locationId)
    return location;
  }
  async getLocations(){
    const response = await this.httpClient.get('/api/locations');
    this.locations = await  response.content;
    return this.locations;
  }

  async deletePoi(poi: string){
    const response = await this.httpClient.delete('api/pois/' + poi)
    console.log(response);
  }

  async deleteUser(user){
    const response = await this.httpClient.delete('api/users/' + user);
    console.log(response);
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
    this.changeRouter(PLATFORM.moduleName('start'))
    //return false;
    return response;
  }
  async updatePoi(poi:Poi){
    try{
      console.log(poi);
      const updateResponse = await this.httpClient.put('api/pois/'+ poi._id , poi)
      console.log(updateResponse);
    }
    catch(e){
      console.log(e);
    }
  }
  async updateUser(user:User){
    try{
      console.log(user);
      const updateResponse = await this.httpClient.put('api/users/'+ user._id , user)
      console.log(updateResponse);
    }
    catch(e){
      console.log(e);
    }
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
