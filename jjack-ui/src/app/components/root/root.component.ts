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
    {name: 'Sparky', id: '150', open: false},
    {name: 'Trogdor', id: '250', open: false},
    {name: 'Ragnaros', id: '350', open: false},
    {name: 'Incendius', id: '450', open: false},
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
