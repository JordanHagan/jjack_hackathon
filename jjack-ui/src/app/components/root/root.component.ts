import {AfterViewChecked, Component} from '@angular/core'
import {Autoclave} from '../../models/autoclave.model'

declare const $: any

@Component({
  selector: 'jjack-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements AfterViewChecked {
  autoclaves: Autoclave[] = [
    {name: 'Sparky', id: '150', open: false, status: 'healthy', lastUpdate: new Date(), uptime: 592},
    {name: 'Trogdor', id: '250', open: false, status: 'warning', lastUpdate: new Date(), uptime: 324},
    {name: 'Ragnaros', id: '350', open: false, status: 'danger', lastUpdate: new Date(), uptime: 788},
    {name: 'Incendius', id: '450', open: false, status: 'offline', lastUpdate: new Date(), uptime: 0},
  ]
  bootstrapped: boolean

  ngAfterViewChecked() {
    if (!this.bootstrapped) $(document).foundation()
    this.bootstrapped = true
  }

  handleClick(event: MouseEvent, autoclave: Autoclave) {
    event.preventDefault()
    if (autoclave.open) {
      autoclave.open = false
    } else {
      this.autoclaves.forEach(autoclave => autoclave.open = false)
      autoclave.open = true
    }
  }
}
