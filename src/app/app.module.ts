import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { GridsterModule} from "angular-gridster2";
import { TimePickerComponent } from './components/dynamic-widget-components/time-picker/time-picker.component';
import { DatePickerComponent } from './components/dynamic-widget-components/date-picker/date-picker.component';
import { TextComponent } from './components/dynamic-widget-components/text/text.component';
import { ImageComponent } from './components/dynamic-widget-components/image/image.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from "@angular/material/button";
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatIconModule} from "@angular/material/icon";
import { MatMenuModule} from "@angular/material/menu";
import { MatDialogModule} from "@angular/material/dialog";
import { AddWidgetFormComponent } from './components/add-widget-form/add-widget-form.component';
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatSelectModule} from "@angular/material/select";
import { MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    TimePickerComponent,
    DatePickerComponent,
    TextComponent,
    ImageComponent,
    AddWidgetFormComponent
  ],
  imports: [
    BrowserModule, GridsterModule, FormsModule, BrowserAnimationsModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDialogModule,
    MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
