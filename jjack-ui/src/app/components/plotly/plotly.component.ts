import {Component, Input, OnChanges, SimpleChanges} from '@angular/core'
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'

@Component({
  selector: 'jjack-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.scss']
})
export class PlotlyComponent implements OnChanges {
  url: SafeResourceUrl

  constructor(private sanitizer: DomSanitizer) {}

  @Input() chartNumber: string
  @Input() height: number

  ngOnChanges(changes: SimpleChanges) {
    if(changes.chartNumber.currentValue) {
      this.updateUrl(changes.chartNumber.currentValue)
    }
  }

  updateUrl(number: number) {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://plot.ly/~bucklerchica/${number}.embed`)
  }
}
