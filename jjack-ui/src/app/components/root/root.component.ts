import {AfterViewChecked, Component, OnInit} from '@angular/core'
import {Agitator} from '../../models/agitator.model'
import {Autoclave} from '../../models/autoclave.model'
import {HttpService} from '../../services/http.service'
import {particles} from '../../../assets/particles'
import * as display from '../../utils/display.utils'

declare const $: any
declare const particlesJS: any

@Component({
  selector: 'jjack-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements AfterViewChecked, OnInit {
  autoclaves: Autoclave[]
  bootstrapped: boolean
  showChart: boolean = false
  display: any = display

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.get()
      .subscribe(data => {
        this.autoclaves = data
        this.bootstrapped = false
      })
  }

  ngAfterViewChecked() {
    if (!this.bootstrapped) {
      $(document).foundation()
      particlesJS('particles-js', particles)
    }
    this.bootstrapped = true
  }

  now() {
    return new Date().toLocaleDateString()
  }

  handleTabClick(autoclave: Autoclave) {
    this.autoclaves.forEach(autoclave => autoclave.selected = false)
    autoclave.selected = true
  }

  handleRowClick(event: MouseEvent, agitator: Agitator) {
    event.preventDefault()
    if (agitator.open) {
      agitator.open = false
    } else {
      const agitators = this.autoclaves
        .filter(autoclave => autoclave.selected)[0].agitators
      agitators.forEach(agitator => agitator.open = false)
      agitator.open = true
    }
  }

  getDaysSinceDowntime(lastStart: Date) {
    const today = new Date()
    const one_day = 1000 * 60 * 60 * 24
    const date1_ms = lastStart.getTime()
    const date2_ms = today.getTime()
    const difference_ms = date2_ms - date1_ms
    return Math.round(difference_ms / one_day)
  }

  getAgitators(status: string) {
    if (!this.autoclaves || !this.autoclaves.length) return []
    return this.autoclaves
      .map(autoclave => {
        return autoclave.agitators
          .filter(agitator => agitator.status === status)
          .map(agitator => {
            agitator.autoclave = autoclave.id
            return agitator
          })
      })
      .reduce((a, b) => a.concat(b))
      .sort(this.byDaysToFailure)
  }

  byDaysToFailure(a: Agitator, b: Agitator) {
    if (a.daysToFailure > b.daysToFailure) return 1
    if (a.daysToFailure < b.daysToFailure) return -1
    return 0
  }

  dangerCount(autoclave: Autoclave) {
    return autoclave.agitators
      .filter(agitator => agitator.status === 'danger')
      .length
  }

  emergency() {
    $('#particles-js').toggleClass('emergency')
  }
}
