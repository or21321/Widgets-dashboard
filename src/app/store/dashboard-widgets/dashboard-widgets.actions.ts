import {DashboardOptions, DashboardRowsColsLayoutAndBgColor, Widget} from "../../models/widget.model";

// Widgets:
export class LoadWidgets {
  static readonly type = '[Widget] Load Dashboard Widgets';
}
export class AddWidget {
  static readonly type = '[Widget] Add Widget';

  constructor(public widget: Widget) {
  }
}
export class UpdateWidget {
  static readonly type = '[Widget] Update Widget';

  constructor(public widget: Widget) {
  }
}
export class DeleteWidget {
  static readonly type = '[Widget] Delete Widget';

  constructor(public widgetId: string) {
  }
}

// Dashboard Options:
export class LoadDashboardOptions {
  static readonly type = '[Widget] Load Dashboard Options'
}

export class UpdateDashboardOptions {
  static readonly type = '[Widget] Update Dashboard Options';

  constructor(public dashboardOptions: DashboardOptions) {
  }
}

// Dashboard settings:
export class SaveDashboardSettings {
  static readonly type = '[Widget] Save Dashboard Settings';

  constructor( public rowsColsAndBgColor: DashboardRowsColsLayoutAndBgColor) {
  }
}
export class SetDashboardBgImg {
  static readonly type = '[Widget] Set Dashboard Background Image';

  constructor( public imgFile: File) {
  }
}

export class ToggleEditMode {
  static readonly type = '[Widget] Toggle Edit Mode'

  constructor(public isSettingsFormOpened?: boolean) {
  }
}
