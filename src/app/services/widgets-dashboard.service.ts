import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {WidgetTypes} from "../app.component";

export interface Widget {
  cols: number,
  rows: number,
  y: number,
  x: number,
  dragEnabled?: boolean,
  resizeEnabled?: boolean,
  label?: string,
  componentType: WidgetTypes,
  hasContent?: boolean,
  minItemRows?: number,
  minItemCols?: number,
  data?: WidgetData
}

type WidgetData = TextWidgetData

interface TextWidgetData {
  text: string
}

const WIDGETS_MOCK_DATA: Widget[] = [
  {cols: 4, rows: 1, y: 0, x: 0, componentType: 'time-picker'},
  {cols: 2, rows: 2, y: 0, x: 2, hasContent: true, componentType: 'date-picker'},
  {
    cols: 2,
    rows: 2,
    y: 3,
    x: 5,
    minItemRows: 2,
    minItemCols: 2,
    label: "Min rows & cols = 2",
    componentType: 'text'
  },
  {
    cols: 2,
    rows: 1,
    y: 2,
    x: 2,
    dragEnabled: true,
    resizeEnabled: true,
    label: "Drag&Resize Enabled",
    componentType: 'image'
  },
  {
    cols: 1,
    rows: 1,
    y: 2,
    x: 4,
    dragEnabled: false,
    resizeEnabled: false,
    label: "Drag&Resize Disabled",
    componentType: 'text'
  },
  {cols: 1, rows: 1, y: 2, x: 6, componentType: 'time-picker'},
];

@Injectable({
  providedIn: 'root'
})
export class WidgetsDashboardService {
  private _widgets$ = new BehaviorSubject(WIDGETS_MOCK_DATA)

  public widgets$ = this._widgets$.asObservable()
  constructor() { }

  public addWidget(widget: Widget): void {
    console.log('addWidget()', widget)
    this._widgets$.next([...this._widgets$.value, {...widget, x: 0, y: 0, cols: 1, rows: 1}])
  }
}
