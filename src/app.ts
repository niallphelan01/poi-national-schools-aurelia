import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {PoiService} from "./services/poi.service";

export class App {
  router: Router;

  constructor(private ds: PoiService) {
  }
  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      /*{
        route: ['', 'donate'],
        name: 'Donate',
        moduleId: PLATFORM.moduleName('views/donate'),
        nav: true,
        title: 'Donate'
      },
      {
        route: 'candidates',
        name: 'candidates',
        moduleId: PLATFORM.moduleName('views/candidates'),
        nav: true,
        title: 'Candidate'
      },

       */
      {
        route: 'user-settings',
        name: 'user-settings',
        moduleId: PLATFORM.moduleName('views/user-settings'),
        nav: true,
        title: 'User-Settings'
      },



      {
        route: 'singlepoi',
        name: 'singlepoi',
        moduleId: PLATFORM.moduleName('views/singlepoi'),
        nav: false,
        title: 'Single poi'
      },
      {
        route: 'edit-poi/:id',
        name: 'edit-poi',
        moduleId: PLATFORM.moduleName('views/edit-poi'),
        nav: false,
        title: 'edit-poi'
      },
      {
        route: ['','poi'],
        name: 'poi',
        moduleId: PLATFORM.moduleName('views/poi'),
        nav: true,
        title: 'National Schools list'
      },
      {
        route: 'map',
        name: 'map',
        moduleId: PLATFORM.moduleName('views/map'),
        nav: true,
        title: 'Map View'
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: PLATFORM.moduleName('views/logout'),
        nav: true,
        title: 'Logout'
      }
    ]);
    this.router = router;
  }
}
