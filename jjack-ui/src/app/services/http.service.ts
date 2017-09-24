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

const names = {
  '150': 'Sparky',
  '250': 'Ragnaros',
  '350': 'Incendius',
  '450': 'Trogdor'
}

const url = 'http://ec2-34-235-196-18.compute-1.amazonaws.com:8105/data'

@Injectable()
export class HttpService {
  constructor(private http: Http) {}

  get() {
    return this.http.get(url)
      .map(res => res.json())
      .map(res => this.transform(res))
      .catch(err => {
        console.log(err)
        return Observable.of(err)
      })
  }

  transform(res): Autoclave[] {
    const autoclaves: Autoclave[] = []
    Object.keys(res).forEach(autoclaveKey => {
      const agitators: Agitator[] = []
      const apiAutoclave = res[autoclaveKey]
      Object.keys(apiAutoclave.agitators).forEach(agitatorKey => {
        const apiAgitator = apiAutoclave.agitators[agitatorKey]
        const agitator = {
          name: agitatorKey,
          open: false,
          status: this.getStatus(apiAgitator.daysToFailure),
          temp: apiAgitator.temperature,
          coolingWater: apiAgitator.coolingWater,
          compartmentTemp: apiAgitator.compartmentTemperature,
          vibration: apiAgitator.vibration,
          daysToFailure: apiAgitator.daysToFailure
        }
        agitators.push(agitator)
      })

      const autoclave = {
        id: autoclaveKey,
        name: names[autoclaveKey],
        agitators,
        selected: false,
        lastStart: new Date(apiAutoclave.upDate)
      }

      autoclaves.push(autoclave)
    })
    autoclaves[0].selected = true
    return autoclaves
  }

  getStatus(daysToFailure: number): string {
    if (daysToFailure <= 10) {
      return 'danger'
    } else if (daysToFailure <= 25) {
      return 'warning'
    }
    return 'healthy'
  }
}
