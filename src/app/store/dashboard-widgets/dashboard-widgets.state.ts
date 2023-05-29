import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {catchError, switchMap, tap} from "rxjs";
import {DashboardOptions, Widget} from "../../models/widget.model";
import {WidgetsDashboardService} from "../../services/widgets-dashboard.service";
import {
  AddWidget,
  DeleteWidget, LoadDashboardOptions,
  LoadWidgets, SaveDashboardSettings,
  SetDashboardBgImg, ToggleEditMode,
  UpdateDashboardOptions,
  UpdateWidget
} from "./dashboard-widgets.actions";
import {insertItem, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {DisplayGrid, GridsterItem, GridsterItemComponentInterface} from "angular-gridster2";

export interface WidgetsStateModel {
  widgets: Widget[]
  isEditMode: boolean
  isSettingsFormOpened: boolean
  dashboardOptions: DashboardOptions | null
  dashboardBgImg: any
  dashboardBgColor: string
  isDashboardLoading: boolean
}

@State<WidgetsStateModel>({
  name: 'widgets',
  defaults: {
    widgets: [],
    isEditMode: false,
    isSettingsFormOpened: false,
    dashboardOptions: null,
    dashboardBgImg: '',
    dashboardBgColor: '#00183aba',
    isDashboardLoading: false
  }
})
@Injectable()
export class WidgetsState {

  constructor(private dashboardWidgetsService: WidgetsDashboardService, private store: Store) {
  }

  @Selector()
  static widgets(state: WidgetsStateModel): Widget[] {
    return state.widgets
  }

  @Selector()
  static dashboardOptions(state: WidgetsStateModel): DashboardOptions | null {
    return state.dashboardOptions
  }

  @Selector()
  static dashboardBgImg(state: WidgetsStateModel) {
    return state.dashboardBgImg
  }

  @Selector()
  static dashboardBgColor(state: WidgetsStateModel) {
    return state.dashboardBgColor
  }

  @Selector()
  static isEditMode(state: WidgetsStateModel) {
    return state.isEditMode
  }

  @Selector()
  static isSettingsFormOpened(state: WidgetsStateModel) {
    return state.isSettingsFormOpened
  }

  // Widgets:
  @Action(LoadWidgets)
  loadWidgets(ctx: StateContext<WidgetsStateModel>, action: LoadWidgets) {
    ctx.patchState({
      isDashboardLoading: true
    })

    return this.dashboardWidgetsService.getWidgets().pipe(
      catchError(err => {
        console.error(err)
        ctx.patchState({
          isDashboardLoading: false
        })
        throw err
      }),
      switchMap((widgets) => {

        return this.store.dispatch(new LoadDashboardOptions()).pipe(
          tap(() => {
            ctx.patchState({
              widgets, isDashboardLoading: false
            })
          })
        )
      })
    )
  }

  @Action(AddWidget)
  addWidget(ctx: StateContext<WidgetsStateModel>, action: AddWidget) {
    return this.dashboardWidgetsService.addWidget(action.widget).pipe(
      tap(() => {
        ctx.setState(patch({
          widgets: insertItem<Widget>(({...this.dashboardWidgetsService.getInitWidget(), ...action.widget}) as Widget)
        }))
      })
    )
  }

  @Action(UpdateWidget)
  updateWidget(ctx: StateContext<WidgetsStateModel>, action: UpdateWidget) {
    ctx.patchState({
      isDashboardLoading: false
    })
    return this.dashboardWidgetsService.updateWidget(action.widget).pipe(
      tap(() => {
        ctx.setState(patch({
          widgets: updateItem<Widget>(widget => widget.id === action.widget.id, action.widget),
          isDashboardLoading: false
        }))
      })
    )
  }

  @Action(DeleteWidget)
  deleteWidget(ctx: StateContext<WidgetsStateModel>, action: DeleteWidget) {
    const {widgetId} = action
    ctx.patchState({
      isDashboardLoading: true
    })
    return this.dashboardWidgetsService.removeWidget(widgetId).pipe(
      tap(() => {
        ctx.setState(patch({
          widgets: removeItem(widget => widget.id === widgetId),
          isDashboardLoading: false
        }))
      })
    )
  }

  // Dashboard Options:
  @Action(LoadDashboardOptions)
  loadDashboardOptions(ctx: StateContext<WidgetsStateModel>, action: LoadDashboardOptions) {
    ctx.patchState({
      isDashboardLoading: true
    })

    return this.dashboardWidgetsService.getInitDashboardOptions().pipe(
      catchError(err => {
        console.error(err)
        ctx.patchState({
          isDashboardLoading: false
        })
        throw err
      }),
      tap((_dashboardOptions: DashboardOptions) => {
        const dashboardOptions = {
          ..._dashboardOptions,
          itemChangeCallback: (gridsterItem: GridsterItem) => {
            // ?
            console.log('itemChangeCB')
            // this.updateWidget(ctx, new UpdateWidget(gridsterItem as Widget))
            const widget = gridsterItem as Widget
            this.store.dispatch(new UpdateWidget(widget))
          },
        }
        ctx.patchState({
          dashboardOptions, isDashboardLoading: false
        })
        console.log("dashboardOptions:", dashboardOptions)
      })
    )
  }

  @Action(UpdateDashboardOptions)
  updateDashboardOptions(ctx: StateContext<WidgetsStateModel>, action: UpdateDashboardOptions) {
    ctx.patchState({
      isDashboardLoading: true
    })
    // Service request...
    ctx.patchState({
      dashboardOptions: action.dashboardOptions
    })

    ctx.patchState({
      isDashboardLoading: false
    })
  }

  //  Dashboard settings:
  @Action(SaveDashboardSettings)
  saveDashboardSettings(ctx: StateContext<WidgetsStateModel>, action: SaveDashboardSettings) {
    const {minRows, maxRows, minCols, maxCols, bgColor} = action.rowsColsAndBgColor
    ctx.patchState({
      isDashboardLoading: true
    })
    const dashboardOptions = ctx.getState().dashboardOptions
    if (!dashboardOptions) throw Error('No dashboard options found')

    const updatedDashboardOptions = {
      ...dashboardOptions,
      minRows,
      minCols,
      maxRows,
      maxCols
    }
    return this.dashboardWidgetsService.updateDashboardOptions(updatedDashboardOptions).pipe(
      switchMap(() => {
        ctx.patchState({
          dashboardOptions: updatedDashboardOptions,
          dashboardBgColor: bgColor,
          isDashboardLoading: false
        })

        return this.store.dispatch(new ToggleEditMode())
      })
    )
    // ctx.patchState({
    //   dashboardBgImg: action.imgFile
    // })
  }

  @Action(SetDashboardBgImg)
  setDashboardBgImg(ctx: StateContext<WidgetsStateModel>, action: SetDashboardBgImg) {
    ctx.patchState({
      isDashboardLoading: true
    })
    // Service request...
    ctx.patchState({
      dashboardBgImg: action.imgFile
    })

    ctx.patchState({
      isDashboardLoading: false
    })
  }

//  Dashboard actions:
  @Action(ToggleEditMode)
  toggleEditMode(ctx: StateContext<WidgetsStateModel>, action: ToggleEditMode) {
    const state = ctx.getState()
    const isEditMode = action.isSettingsFormOpened ? true : !state.isEditMode
    const dashboardOptions = state.dashboardOptions
    if (!dashboardOptions) {
      throw Error('No dashboard options found')
      return
    }
    dashboardOptions.draggable.enabled = isEditMode
    dashboardOptions.resizable.enabled = isEditMode
    dashboardOptions.displayGrid = isEditMode ? DisplayGrid.Always : DisplayGrid.None
    // Service request...
    ctx.setState({
      ...state,
      isEditMode,
      dashboardOptions,
      isSettingsFormOpened: action.isSettingsFormOpened ? action.isSettingsFormOpened : false
    })
  }
}
