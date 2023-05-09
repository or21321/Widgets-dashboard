import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { GridsterModule} from "angular-gridster2";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, GridsterModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
