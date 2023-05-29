import {BaseWidgetStyle, DashboardOptions, Widget} from "../models/widget.model";
import {CompactType, DisplayGrid, GridType} from "angular-gridster2";
import {createId} from "./util-functions";

export const WIDGETS_DB_KEY = 'widgets'
export const DASHBOARD_OPTIONS_DB_KEY = 'dashboard-options'

export const DASHBOARD_OPTIONS_MOCK: DashboardOptions = {
  bgColor: 'rgba(0, 24, 58, 0.73)',
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
  minCols: 5,
  maxCols: 25,
  minRows: 5,
  maxRows: 25,
  maxItemCols: 25,
  minItemCols: 1,
  maxItemRows: 25,
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

export const INIT_BASE_WIDGET_STYLE: BaseWidgetStyle = {
  color: '#ffffff',
  backgroundColor: '',
  border: '',
  borderRadius: '',
  opacity: '',
  margin: '',
  fontSize: ''
}
