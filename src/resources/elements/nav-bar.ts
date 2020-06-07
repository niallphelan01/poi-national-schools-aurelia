import { bindable } from "aurelia-framework";
import {Poi} from "../../services/poi-types";
import { faGithub } from "@fortawesome/free-brands-svg-icons";;
import { faBars, faMapMarked } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import {PoiService} from "../../services/poi.service";

export class Header {
  @bindable poi
  github = faGithub;
  map = faMapMarked;
  mapAlt = faMap;
  bars = faBars;


  constructor(private ds:PoiService) {
  }

}
