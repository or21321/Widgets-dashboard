// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
// }
import {Component, VERSION} from "@angular/core";
import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterConfig,
  GridsterItem,
  GridType,
  PushDirections,
  Resizable,
} from "angular-gridster2";
import {TimePickerComponent} from "./components/dynamic-widget-components/time-picker/time-picker.component";
import {DatePickerComponent} from "./components/dynamic-widget-components/date-picker/date-picker.component";
import {ImageComponent} from "./components/dynamic-widget-components/image/image.component";
import {TextComponent} from "./components/dynamic-widget-components/text/text.component";
import {MatDialog} from "@angular/material/dialog";
import {AddWidgetFormComponent} from "./components/add-widget-form/add-widget-form.component";
import {Widget, WidgetsDashboardService} from "./services/widgets-dashboard.service";
import {Observable} from "rxjs";

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

enum WidgetTypesEnum {
  'time-picker' = 'time-picker',
  'date-picker' = 'date-picker',
  'image' = 'image',
  'text' = 'text',
}

export type WidgetTypes = 'time-picker' | 'date-picker' | 'image' | 'text'
// export type WidgetTypes = {
//   [key in WidgetTypesEnum]: string
// }

interface DynamicWidgetComponents {
  "time-picker": typeof TimePickerComponent,
  "date-picker": typeof DatePickerComponent,
  image: typeof ImageComponent,
  text: typeof TextComponent
}


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  name = "Angular " + VERSION.major;
  options!: Safe;
  // dashboard!: Array<GridsterItem>;
  widgets$!: Observable<Widget[]>
  dynamicWidgetComponents: DynamicWidgetComponents = {
    [WidgetTypesEnum["time-picker"]]: TimePickerComponent,
    [WidgetTypesEnum['date-picker']]: DatePickerComponent,
    [WidgetTypesEnum['image']]: ImageComponent,
    [WidgetTypesEnum['text']]: TextComponent
  }
  isEditMode = false

  get toggleEditText(): string {
    return this.isEditMode? 'Stop edit' : 'Edit'
  }

  constructor(private dialog: MatDialog, private widgetsDashboardService: WidgetsDashboardService) {
  }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      margin: 5,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      useBodyForBreakpoint: false,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: false,
      },
      resizable: {
        enabled: false,
      },
      swap: false,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
    };

    this.widgets$ = this.widgetsDashboardService.widgets$
    // this.dashboard = [
    //   {cols: 4, rows: 1, y: 0, x: 0, componentType: 'time-picker'},
    //   {cols: 2, rows: 2, y: 0, x: 2, hasContent: true, componentType: 'date-picker'},
    //   {
    //     cols: 2,
    //     rows: 2,
    //     y: 3,
    //     x: 5,
    //     minItemRows: 2,
    //     minItemCols: 2,
    //     label: "Min rows & cols = 2",
    //   },
    //   {
    //     cols: 2,
    //     rows: 1,
    //     y: 2,
    //     x: 2,
    //     dragEnabled: true,
    //     resizeEnabled: true,
    //     label: "Drag&Resize Enabled",
    //     componentType: 'Image'
    //   },
    //   {
    //     cols: 1,
    //     rows: 1,
    //     y: 2,
    //     x: 4,
    //     dragEnabled: false,
    //     resizeEnabled: false,
    //     label: "Drag&Resize Disabled",
    //     componentType: 'text'
    //   },
    //   {cols: 1, rows: 1, y: 2, x: 6, componentType: 'time-picker'},
    // ];
  }

  getDynamicComponent(widget: Widget): any {
    return this.dynamicWidgetComponents[this.getDynamicComponentType(widget)]
    // return this.dynamicWidgetComponents['time-picker']
  }

  getDynamicComponentType(widget: Widget): keyof DynamicWidgetComponents {
    return widget.componentType
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  // removeItem($event: MouseEvent | TouchEvent, item: any): void {
  //   $event.preventDefault();
  //   $event.stopPropagation();
  //   this.dashboard.splice(this.dashboard.indexOf(item), 1);
  // }

  // addItem(): void {
  //   this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1});
  // }

  openAddWidgetDialog(): void {
    console.log('openAddWidgetDialog()')
    let dialogRef = this.dialog.open(AddWidgetFormComponent, {
      height: '400px',
      width: '600px',
    });
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode
    this.options.draggable.enabled = this.isEditMode
    this.options.resizable.enabled = this.isEditMode
    this.options.displayGrid = this.isEditMode ? DisplayGrid.Always : DisplayGrid.None

    this.changedOptions()
  }
}


