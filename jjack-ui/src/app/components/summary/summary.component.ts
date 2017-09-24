import {Component, Input} from '@angular/core'
import {Agitator} from '../../models/agitator.model'

@Component({
  selector: 'jjack-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() dangerousAgitators: Agitator[]
  factor: number = 1.8
}
