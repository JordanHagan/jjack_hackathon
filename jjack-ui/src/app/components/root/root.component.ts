import {AfterViewChecked, Component} from '@angular/core'
import {Agitator} from '../../models/agitator.model'
import {Autoclave} from '../../models/autoclave.model'

declare const $: any

@Component({
  selector: 'jjack-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements AfterViewChecked {
  autoclaves: Autoclave[] = [
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
  bootstrapped: boolean

  ngAfterViewChecked() {
    if (!this.bootstrapped) $(document).foundation()
    this.bootstrapped = true
  }

  handleTabClick(autoclave: Autoclave) {
    this.autoclaves.forEach(autoclave => autoclave.selected = false)
    autoclave.selected = true
  }

  handleRowClick(event: MouseEvent, agitator: Agitator) {
    event.preventDefault()
    console.log('row click')
    if (agitator.open) {
      agitator.open = false
    } else {
      let agitators = this.selectedAgitators()
      console.log(agitators)
      agitators.forEach(agitator => agitator.open = false)
      agitator.open = true
    }
  }

  selectedAgitators() {
    return this.autoclaves.filter(autoclave => autoclave.selected)[0].agitators
  }
}
