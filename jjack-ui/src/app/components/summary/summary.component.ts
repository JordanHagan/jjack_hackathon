import {Component, Input} from '@angular/core'
import {Agitator} from '../../models/agitator.model'
import * as display from '../../utils/display.utils'

@Component({
  selector: 'jjack-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() dangerousAgitators: Agitator[]
  display: any = display
}
