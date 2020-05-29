import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import { Location } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";

export class PoiList {
  @bindable
  pois: Poi[];
  @bindable()
  locations: Location[];


  sayHello() {
    alert(`Additional link via this functionality for school`);
  }

}
