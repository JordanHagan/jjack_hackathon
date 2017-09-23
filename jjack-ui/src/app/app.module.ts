import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {RootComponent} from './components/root/root.component'
import {PlotlyComponent} from './components/plotly/plotly.component'

@NgModule({
  declarations: [
    RootComponent,
    PlotlyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule {}
