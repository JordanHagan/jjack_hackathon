import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/of'

const fixtureData = [
  {
    name: 'Sparky',
    id: '150',
    selected: true,
    agitators: [
      {name: 'A', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 592},
      {name: 'B', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 78},
      {name: 'C', open: false, status: 'warning', lastUpdate: new Date(), uptime: 1184},
      {name: 'D', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 924},
      {name: 'E', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 990},
      {name: 'F', open: false, status: 'warning', lastUpdate: new Date(), uptime: 427},
      {name: 'G', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 114},
    ]
  },
  {
    name: 'Trogdor',
    id: '250',
    selected: false,
    agitators: [
      {name: 'A', open: false, status: 'danger', lastUpdate: new Date(), uptime: 1544},
      {name: 'B', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 324},
      {name: 'C', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 1142},
      {name: 'D', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 644},
      {name: 'E', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 400},
      {name: 'F', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 971},
      {name: 'G', open: false, status: 'warning', lastUpdate: new Date(), uptime: 538},
    ]
  },
  {
    name: 'Ragnaros',
    id: '350',
    selected: false,
    agitators: [
      {name: 'A', open: false, status: 'danger', lastUpdate: new Date(), uptime: 2094},
      {name: 'B', open: false, status: 'danger', lastUpdate: new Date(), uptime: 448},
      {name: 'C', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
      {name: 'D', open: false, status: 'warning', lastUpdate: new Date(), uptime: 556},
      {name: 'E', open: false, status: 'warning', lastUpdate: new Date(), uptime: 587},
      {name: 'F', open: false, status: 'warning', lastUpdate: new Date(), uptime: 1002},
      {name: 'G', open: false, status: 'danger', lastUpdate: new Date(), uptime: 1455},
    ]
  },
  {
    name: 'Incendius',
    id: '450',
    selected: false,
    agitators: [
      {name: 'A', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
      {name: 'B', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
      {name: 'C', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
      {name: 'D', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
      {name: 'E', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
      {name: 'F', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
      {name: 'G', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
    ]
  },
]

export class HttpService {
  get(url) {
    return Observable.of(fixtureData)
  }
}
