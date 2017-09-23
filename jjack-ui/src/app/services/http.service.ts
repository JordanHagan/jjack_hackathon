import 'rxjs/add/observable/of'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/map'
import {Http} from '@angular/http'
import {Autoclave} from '../models/autoclave.model'
import 'rxjs/add/operator/catch'
import {Observable} from 'rxjs/Observable'
import 'rxjs/add/operator/finally'
import {Injectable} from '@angular/core'
import {Agitator} from '../models/agitator.model'

const fixtureData: Autoclave[] = [
  {
    name: 'Sparky',
    id: '150',
    selected: true,
    lastStart: new Date(),
    agitators: [
      {name: 'A', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'B', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'C', open: false, status: 'warning', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'D', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'E', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'F', open: false, status: 'warning', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'G', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
    ]
  },
  {
    name: 'Trogdor',
    id: '250',
    selected: false,
    lastStart: new Date(),
    agitators: [
      {name: 'A', open: false, status: 'danger', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'B', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'C', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'D', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'E', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'F', open: false, status: 'healthy', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'G', open: false, status: 'warning', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
    ]
  },
  {
    name: 'Ragnaros',
    id: '350',
    selected: false,
    lastStart: new Date(),
    agitators: [
      {name: 'A', open: false, status: 'danger', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'B', open: false, status: 'danger', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'C', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'D', open: false, status: 'warning', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'E', open: false, status: 'warning', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'F', open: false, status: 'warning', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'G', open: false, status: 'danger', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
    ]
  },
  {
    name: 'Incendius',
    id: '450',
    selected: false,
    lastStart: new Date(),
    agitators: [
      {name: 'A', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'B', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'C', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'D', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'E', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'F', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
      {name: 'G', open: false, status: 'offline', temp: 50, vibration: 50, coolingWater: 50, compartmentTemp: 50},
    ]
  },
]

const apiData = {
  '150': {
    up_date: '2017-05-05',
    agitators: {
      A: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      B: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      C: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      D: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      E: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      F: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      G: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
    }
  },
  '250': {
    up_date: '2017-05-05',
    agitators: {
      A: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      B: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      C: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      D: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      E: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      F: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      G: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
    }
  },
  '350': {
    up_date: '2017-05-05',
    agitators: {
      A: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      B: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      C: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      D: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      E: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      F: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      G: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
    }
  },
  '450': {
    up_date: '2017-05-05',
    agitators: {
      A: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      B: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      C: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      D: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      E: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      F: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
      G: {temperature: 50, vibrations: 150, compartmentTemperature: 25, coolingWater: 100, daysToFailure: 10},
    }
  },
}

const names = {
  '150': 'Sparky',
  '250': 'Ragnaros',
  '350': 'Incendius',
  '450': 'Trogdor'
}

@Injectable()
export class HttpService {
  constructor(private http: Http) {}

  get(url) {
    // return this.http.get(url)
    //   .map(res => res.json())
    //   .map(res => this.transform(res))
    //   .catch(err => {
    //     console.log(err)
    //     return Observable.of(err)
    //   })
    return Observable.of(this.transform({}))
  }

  transform(res): Autoclave[] {
    const autoclaves: Autoclave[] = []
    Object.keys(apiData).forEach(autoclaveKey => {
      const agitators: Agitator[] = []
      Object.keys(apiData[autoclaveKey].agitators).forEach(agitatorKey => {
        const apiAgitator = apiData[autoclaveKey].agitators[agitatorKey]
        const agitator = {
          name: agitatorKey, open: false, status: this.getStatus(apiAgitator.daysToFailure), temp: apiAgitator.temperature,
          coolingWater: apiAgitator.coolingWater, compartmentTemp: apiAgitator.compartmentTemperature,
          vibration: apiAgitator.vibration, daysToFailure: apiAgitator.daysToFailure
        }
        agitators.push(agitator)
      })

      const autoclave = {id: autoclaveKey, name: names[autoclaveKey], agitators, selected: false, lastStart: new Date()}

      autoclaves.push(autoclave)
    })
    autoclaves[0].selected = true
    return autoclaves
  }

  getStatus(daysToFailure: number): string {
    if(daysToFailure <= 10) {
      return 'danger'
    } else if(daysToFailure <= 25) {
      return 'warning'
    }
    return 'healthy'
  }
}
