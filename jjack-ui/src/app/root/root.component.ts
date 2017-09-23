import {Component} from '@angular/core';

@Component({
  selector: 'jjack-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {
  timestamp = new Date().toLocaleDateString()
}
