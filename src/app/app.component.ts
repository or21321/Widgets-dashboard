// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
// }
import {Component, HostBinding, Injector, VERSION} from "@angular/core";
import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterConfig,
  GridsterItem, GridsterItemComponentInterface,
  GridType,
  PushDirections,
  Resizable,
} from "angular-gridster2";
import {ImageComponent} from "./components/dynamic-widget-components/image/image.component";
import {TextComponent} from "./components/dynamic-widget-components/text/text.component";
import {MatDialog} from "@angular/material/dialog";
import {WidgetsDashboardService} from "./services/widgets-dashboard.service";
import {Observable} from "rxjs";
import {DashboardOptions, Widget} from "./models/widget.model";
import {SettingsFormComponent} from "./components/widget-editor/settings-form/settings-form.component";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";
import {Select, Store} from "@ngxs/store";
import {LoadWidgets, ToggleEditMode} from "./store/dashboard-widgets/dashboard-widgets.actions";
import {WidgetsState} from "./store/dashboard-widgets/dashboard-widgets.state";

// enum WidgetTypesEnum {
//   'time-picker' = 'time-picker',
//   'date-picker' = 'date-picker',
//   'image' = 'image',
//   'text' = 'text',
// }

// export type WidgetTypes = {
//   [key in WidgetTypesEnum]: string
// }

// interface DynamicWidgetComponents {
//   "time-picker": typeof TimePickerComponent,
//   "date-picker": typeof DatePickerComponent,
//   image: typeof ImageComponent,
//   text: typeof TextComponent
// }


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  // options!: Safe;
  // dashboard!: Array<GridsterItem>;
  widgets: Widget[] = []
  dashboardOptions!: DashboardOptions
  // dynamicWidgetComponents: DynamicWidgetComponents = {
  //   [WidgetTypesEnum["time-picker"]]: TimePickerComponent,
  //   [WidgetTypesEnum['date-picker']]: DatePickerComponent,
  //   [WidgetTypesEnum['image']]: ImageComponent,
  //   [WidgetTypesEnum['text']]: TextComponent
  // }
  isEditMode = false
  isSettingsFormOpened = false
  bgImg: SafeResourceUrl = ''

  @Select(WidgetsState.widgets) widgets$!: Observable<Widget[]>
  @Select(WidgetsState.dashboardOptions) dashboardOptions$!: Observable<DashboardOptions>
  @Select(WidgetsState.dashboardBgImg) dashboardBgImg$!: Observable<File>
  @Select(WidgetsState.dashboardBgColor) dashboardBgColor$!: Observable<File>
  @Select(WidgetsState.isEditMode) isEditMode$!: Observable<boolean>
  @Select(WidgetsState.isSettingsFormOpened) isSettingsFormOpened$!: Observable<boolean>

  get toggleEditText(): string {
    return this.isEditMode ? 'Stop edit' : 'Edit'
  }

  constructor(private store: Store, private dialog: MatDialog, private widgetsDashboardService: WidgetsDashboardService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadWidgets())
    this.widgets$.subscribe(widgets => this.widgets = widgets)
    this.dashboardOptions$.subscribe((dashboardOptions) => {
      if (!dashboardOptions) return
      this.dashboardOptions = dashboardOptions
      this.changedOptions()
    })
    this.dashboardBgImg$.subscribe(file => {
      if (file) {
        const url = this.sanitizer.bypassSecurityTrustResourceUrl(`url("${URL.createObjectURL(file)}")`)
        this.bgImg = url
      }
    })
    this.isEditMode$.subscribe(isEditMode => {
      this.isEditMode = isEditMode
      this.changedOptions()
    })
    this.isSettingsFormOpened$.subscribe(isSettingsFormOpened => {
      this.isSettingsFormOpened = isSettingsFormOpened
      this.changedOptions()
    })
  }
  //
  // getDynamicComponent(widget: Widget): any {
  //   return this.dynamicWidgetComponents[this.getDynamicComponentType(widget)]
  // }
  //
  // getDynamicComponentType(widget: Widget): keyof DynamicWidgetComponents {
  //   return widget.componentType
  // }

  // createInjectorForDynamicComponent(item: Widget) {
  //   let injector = Injector.create({
  //     providers: [
  //       {provide: 'data', useValue: item.data},
  //       {provide: 'isEdit', useValue: this.isEditMode},
  //       {provide: 'id', useValue: item.id},
  //       {provide: 'style', useValue: item.style}
  //     ],
  //     parent: this.inj
  //   });
  //   return injector;
  // }

  changedOptions(): void {
    console.log('CHNAGED OPTIONS')
    if (this.dashboardOptions.api && this.dashboardOptions.api.optionsChanged) {
      this.dashboardOptions.api.optionsChanged();
    }
  }

  openSettingsDialog(): void {
    this.store.dispatch(new ToggleEditMode(true))
  }

  toggleEditMode(): void {
    this.store.dispatch(new ToggleEditMode())
  }
}


