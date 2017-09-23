import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {RootComponent} from './components/root/root.component'
import {PlotlyComponent} from './components/plotly/plotly.component'
import {HttpService} from './services/http.service'

@NgModule({
  declarations: [
    RootComponent,
    PlotlyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
