import {AfterViewChecked, Component, OnInit} from '@angular/core'
import {Agitator} from '../../models/agitator.model'
import {Autoclave} from '../../models/autoclave.model'
import {HttpService} from '../../services/http.service'
import {particles} from '../../../assets/particles'

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

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.get('/data').subscribe(data => this.autoclaves = data)
  }

  ngAfterViewChecked() {
    if (!this.bootstrapped) {
      $(document).foundation()
      particlesJS('particles-js', particles);
    }
    this.bootstrapped = true
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
}
