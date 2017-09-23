import {Component} from '@angular/core';
import {Autoclave} from "../models/autoclave.model";

@Component({
  selector: 'jjack-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  autoclaves: Autoclave[] = [
    {name: 'Sparky', id: '150'},
    {name: 'Trogdor', id: '250'},
    {name: 'Ragnaros', id: '350'},
    {name: 'Incendius', id: '450'},
  ]
}
