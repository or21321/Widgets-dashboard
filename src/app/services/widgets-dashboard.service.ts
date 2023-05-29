import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subscription, tap} from "rxjs";
import {WidgetTypes, Widget, DashboardOptions} from "../models/widget.model";
import {createId, getFromLocalStorage, saveToLocalStorage} from "../utils/util-functions";
import {
  DisplayGrid,
} from "angular-gridster2";
import {
  DASHBOARD_OPTIONS_DB_KEY,
  DASHBOARD_OPTIONS_MOCK,
  INIT_BASE_WIDGET_STYLE,
  WIDGETS_DB_KEY
} from "../utils/constants";

@Injectable({
  providedIn: 'root'
})
export class WidgetsDashboardService {
  constructor() {
  }

  public getInitWidget(): Widget {
    return new Widget()
  }

  private saveWidgetsToLocalStorage(widgets: Widget[]): void {
    console.log(widgets)
    saveToLocalStorage(WIDGETS_DB_KEY, widgets)
  }

  public addWidget(widget: Widget): Observable<Widget[]> {
    return this.getWidgets().pipe(
      tap(widgets => {
        if (widgets && widgets instanceof Array) {
          widgets.push(widget)
          this.saveWidgetsToLocalStorage(widgets)
        }
      })
    )
  }

  public updateWidget(widget: Widget): Observable<Widget[]> {
    return this.getWidgets().pipe(
      tap(widgets => {
        const idx = widgets.findIndex(w => {
          return w.id === widget.id
        })
        if (idx === -1) return
        else widgets.splice(idx, 1, widget)
        this.saveWidgetsToLocalStorage(widgets)
      })
    )
  }

  public removeWidget(id: string): Observable<Widget[]> {
    return this.getWidgets().pipe(
      tap(widgets => {
        const idx = widgets.findIndex(w => w.id === id)
        if (idx === -1) return
        else widgets.splice(idx, 1)
        this.saveWidgetsToLocalStorage(widgets)
      })
    )
  }

  public getWidgets(): Observable<Widget[]> {
    const widgets = getFromLocalStorage(WIDGETS_DB_KEY) as Widget[]
    if (widgets && widgets.length) return of(widgets)
    else return of(this.getMockWidgets())
  }

  private getMockWidgets(): Widget[] {
    const mockWidgets = [
      new Widget('text', {
          text: 'Meeting Room Arava'
        },
        {
          ...INIT_BASE_WIDGET_STYLE,
          margin: '0 auto 0 0',
          fontSize: '40px'
        }, 1, 0, 2, 5),
      new Widget('today-date', undefined, undefined, 18, 0, 2, 1),
      new Widget('image', {
        src: 'assets/location.svg'
      }, {
        ...INIT_BASE_WIDGET_STYLE,
        backgroundColor: '',
        border: 'none'
      }, 0, 0, 2, 1),
      new Widget('clock', undefined, {
        ...INIT_BASE_WIDGET_STYLE,
        fontSize: '60px',
        margin: '0 0 0 auto'
      }, 19, 0, 2, 2),
      new Widget('image', {
        src: 'assets/clock.svg'
      }, undefined, 21, 0, 2, 1),
      new Widget('image', {
        src: 'assets/kramer-logo.png'
      }, undefined, 8, 10, 1, 5),
      new Widget('calendar', undefined, {
        ...INIT_BASE_WIDGET_STYLE,
        backgroundColor: 'rgba(0, 21, 53, 0.6)',
        fontSize: '20px'
      }, 6, 2, 6, 9),
      new Widget('wifi', {
        wifiName: 'WIFI_1',
        password: '1234'
      }, {
        ...INIT_BASE_WIDGET_STYLE,
        fontSize: '20px',
        backgroundColor: 'rgba(0, 21, 53, 0.6)',
        borderRadius: '4px'
      }, 0, 9, 2, 4)
    ];
    this.saveWidgetsToLocalStorage(mockWidgets)
    return mockWidgets
  }

  // Dashboard options:
  updateDashboardOptions(dashboardOptions: DashboardOptions): Observable<DashboardOptions> {
    saveToLocalStorage(DASHBOARD_OPTIONS_DB_KEY, dashboardOptions)
    return of(dashboardOptions)
  }

  public getInitDashboardOptions(): Observable<DashboardOptions> {
    let dashboardOptions = getFromLocalStorage(DASHBOARD_OPTIONS_DB_KEY) as DashboardOptions
    if (!dashboardOptions) {
      return of(DASHBOARD_OPTIONS_MOCK)
    }
    return of(dashboardOptions)
  }

  // Dashboard settings:
  // public setBgImg(imgSrc: File): void {
  //   console.log("imgSrc:", imgSrc)
  //   this._bgImg$.next(imgSrc)
  // }
  //
  // public saveSettings(settings: any): void {
  //   console.log("settings:", settings)
  //   this.setBgImg(settings)
  // }

  // Dashboard actions:
  // public toggleEditMode(): void {
  //   const isEditMode = !this._isEditMode$.value
  //   const dashboardOptions = this._dashboardOptions$.value
  //   dashboardOptions.draggable.enabled = isEditMode
  //   dashboardOptions.resizable.enabled = isEditMode
  //   dashboardOptions.displayGrid = isEditMode ? DisplayGrid.Always : DisplayGrid.None
  //
  //   this._isEditMode$.next(isEditMode)
  //   this._dashboardOptions$.next(dashboardOptions)
  //
  //   // this.changedDashboardOptions()
  // }

  //
  // private changedDashboardOptions(): void {
  //   this._dashboardOptions$.value.api.optionsChanged();
  // }
}
