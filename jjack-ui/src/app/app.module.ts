import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {RootComponent} from './components/root/root.component'
import {PlotlyComponent} from './components/plotly/plotly.component'
import {HttpService} from './services/http.service'
import {HttpModule} from '@angular/http'
import {SummaryComponent} from './components/summary/summary.component'

@NgModule({
  declarations: [
    RootComponent,
    PlotlyComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
