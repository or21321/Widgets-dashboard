import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {GridsterModule} from "angular-gridster2";
import {ClockComponent} from "./components/dynamic-widget-components/clock/clock.component";
import {TextComponent} from './components/dynamic-widget-components/text/text.component';
import {ImageComponent} from './components/dynamic-widget-components/image/image.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {SettingsFormComponent} from './components/widget-editor/settings-form/settings-form.component';
import {SafeHtmlPipe} from "./pipes/safe-html.pipe";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatTabsModule} from "@angular/material/tabs";
import {WidgetTypeFormComponent} from "./components/widget-editor/dynamic-widget-forms/widget-type-form/widget-type-form.component";
import { WidgetEditorComponent } from './components/widget-editor/widget-editor.component';

import {NgxsModule} from "@ngxs/store";
import {WidgetsState} from "./store/dashboard-widgets/dashboard-widgets.state";
import { DynamicComponentContainerComponent } from './components/dynamic-component-container/dynamic-component-container.component';
import { CalendarComponent } from './components/dynamic-widget-components/calendar/calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    ImageComponent,
    SettingsFormComponent,
    SafeHtmlPipe,
    WidgetTypeFormComponent,
    WidgetEditorComponent,
    DynamicComponentContainerComponent,
    ClockComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule, GridsterModule, FormsModule, BrowserAnimationsModule,
    MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatDialogModule,
    MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatInputModule, MatSidenavModule, MatTabsModule,
    NgxsModule.forRoot([WidgetsState]),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
