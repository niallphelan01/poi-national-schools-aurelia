import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import { Location } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";
import attribute from "../../../aurelia_project/generators/attribute";



export class PoiList {
  @bindable
  pois: Poi[];
  @bindable()
  locations: Location[];


  returnedIndex(index) {
    alert(this.pois[index]._id );
  }

}
