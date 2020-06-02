import {bindable, inject} from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import { Location } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";
import * as environment from "../../../config/environment.json";



@inject(PoiService)  //dependency injection required for the deletePoi call from PoiService

export class PoiList {
  @bindable
  pois: Poi[];
  @bindable()
  locations: Location[];
  fileName;
  file;

  fileSelected(event, index) {
    //Handling of the file upload
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.readAsDataURL(file);
    this.fileName = file.name;
    reader.onload = () => {
      file = reader.result
    };
    var formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset', 'wao9sju0');
    const poi = this.pois[index];  //get the current poi which will need to be updated with the poi
    const response = this.ds.sendImageCloudinary(formData,poi);  //sending the formData and also the poi to be updated
    console.log("response from the function")
    console.log(response)





  }
  constructor (private ds: PoiService) {
    }

  deleteSinglePoi(index) {

    const poi = this.pois[index]._id;
    const response = this.ds.deletePoi(poi);
    console.log(response);
    //TODO refresh the screen
  }

  //https://www.youtube.com/watch?v=6uHfIv4981U&t=252s
  //https://stackoverflow.com/questions/10102520/how-to-access-files-attribute-of-a-file-element-using-javascript/10102845
  /*async addNewImage(){

    alert("");

    const baseUrl = 'cloudinary://221829877636215:utygsCw3-XwrmT2CsyiVyWZclfk@dcswkfi6w/'
    const CLOUDINARY_URL= "cloudinary://221829877636215:utygsCw3-XwrmT2CsyiVyWZclfk@dcswkfi6w/upload";
    const CLOUDINARY_UPLOAD_PRESET = "wao9sju0";
    const imgUpload = (<HTMLInputElement>document.getElementById('imgUpload')).files[0];
    console.log(imgUpload.name)
    const file = imgUpload;
    var formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset', 'images');
    const headersURL = {'Content-Type': 'application/x-www-form-urlencoded'}
    //const response = await this.httpClient.post('/image/upload',formData)
    const response = this.ds.sendImageCloudinary(formData)
   //console.log(response);
  }


   */

}
