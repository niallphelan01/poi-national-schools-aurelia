import { bindable } from 'aurelia-framework';
import { Poi } from '../../services/poi-types';
import { Location } from '../../services/poi-types';

export class PoiList {
  @bindable
  pois: Poi[];
  @bindable()
  locations: Location[];
}
