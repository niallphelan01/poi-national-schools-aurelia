import {bindable, inject} from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import { Location } from '../../services/poi-types';
import {PoiService} from "../../services/poi.service";


@inject(PoiService)  //dependency injection required for the deletePoi call from PoiService
export class PoiList {
  @bindable
  pois: Poi[];
  @bindable()
  locations: Location[];

  constructor (private ds: PoiService) {
    }
  deleteSinglePoi(index) {
    const poi = this.pois[index]._id;
    const response = this.ds.deletePoi(poi);
    //TODO refresh the screen
  }


}
