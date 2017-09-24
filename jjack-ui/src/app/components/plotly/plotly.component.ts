import {Component, Input} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'

@Component({
  selector: 'jjack-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss']
})
export class PlotlyComponent {
  constructor(private sanitizer: DomSanitizer) {}

  @Input() url: string
  @Input() height: number

  getUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://plot.ly/${this.url}`)
  }
}
