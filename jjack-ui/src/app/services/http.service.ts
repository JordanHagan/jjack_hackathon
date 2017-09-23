import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/of'

const fixtureData = [
  {
    name: 'Sparky',
    id: '150',
    selected: true,
    agitators: [
      {name: 'A', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 592},
      {name: 'B', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 592},
      {name: 'C', open: false, status: 'warning', lastUpdate: new Date(), uptime: 592},
      {name: 'D', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 592},
      {name: 'E', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 592},
      {name: 'F', open: false, status: 'warning', lastUpdate: new Date(), uptime: 592},
      {name: 'G', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 592},
    ]
  },
  {
    name: 'Trogdor',
    id: '250',
    selected: false,
    agitators: [
      {name: 'A', open: false, status: 'danger', lastUpdate: new Date(), uptime: 324},
      {name: 'B', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 324},
      {name: 'C', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 324},
      {name: 'D', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 324},
      {name: 'E', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 324},
      {name: 'F', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 324},
      {name: 'G', open: false, status: 'warning', lastUpdate: new Date(), uptime: 324},
    ]
  },
  {
    name: 'Ragnaros',
    id: '350',
    selected: false,
    agitators: [
      {name: 'A', open: false, status: 'danger', lastUpdate: new Date(), uptime: 788},
      {name: 'B', open: false, status: 'danger', lastUpdate: new Date(), uptime: 788},
      {name: 'C', open: false, status: 'offline', lastUpdate: new Date(), uptime: 788},
      {name: 'D', open: false, status: 'warning', lastUpdate: new Date(), uptime: 788},
      {name: 'E', open: false, status: 'warning', lastUpdate: new Date(), uptime: 788},
      {name: 'F', open: false, status: 'warning', lastUpdate: new Date(), uptime: 788},
      {name: 'G', open: false, status: 'danger', lastUpdate: new Date(), uptime: 788},
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
