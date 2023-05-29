import {Draggable, GridsterConfig, GridsterItem, PushDirections, Resizable} from "angular-gridster2";
import {GridsterItemComponentInterface} from "angular-gridster2/lib/gridsterItem.interface";
import {INIT_BASE_WIDGET_STYLE} from "../utils/constants";

export type WidgetTypes = 'clock' | 'today-date' | 'image' | 'text' | 'calendar' | 'wifi'

// Widget class:
interface InitDataByTypeMap {
  text: TextWidgetData,
  image: ImageWidgetData,
  'today-date': TodayDateWidgetData,
  'clock': ClockWidgetData,
  calendar: CalendarWidgetData,
  wifi: WifiWidgetData
}

interface InitStyleByTypeMap {
  text: TextWidgetStyle,
  image: ImageWidgetStyle,
  'today-date': TodayDateWidgetStyle,
  'clock': ClockWidgetStyle,
  calendar: CalendarWidgetStyle,
  wifi: WifiWidgetStyle
}

export class Widget implements GridsterItem {
  x: number = 1
  y: number = 1
  rows: number = 1
  cols: number = 1
  layerIndex?: number;
  initCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void;
  dragEnabled?: boolean;
  resizeEnabled?: boolean;
  resizableHandles?: {
    s?: boolean;
    e?: boolean;
    n?: boolean;
    w?: boolean;
    se?: boolean;
    ne?: boolean;
    sw?: boolean;
    nw?: boolean;
  };
  compactEnabled?: boolean;
  maxItemRows?: number;
  minItemRows?: number;
  maxItemCols?: number;
  minItemCols?: number;
  minItemArea?: number;
  maxItemArea?: number;

  [propName: string]: any;

  id: string = this.createId()

  constructor(public componentType: WidgetTypes = 'text', public data?: WidgetData, public style?: WidgetStyle, x: number = 1, y: number = 1, rows: number = 1, cols: number = 1
  ) {
    this.x = x
    this.y = y
    this.rows = rows
    this.cols = cols

    if (this.data) {
      this.data = data;
    } else {
      this.data = this.getInitDataByType(componentType)
    }

    if (this.style) {
      this.style = style
    } else {
      this.style = this.getInitStyleByType(componentType)
    }
  }

  private getInitDataByType(_componentType: WidgetTypes): WidgetData {
    const componentType = _componentType as keyof InitDataByTypeMap
    return this.initDataByTypeMap[componentType] as WidgetData
  }

  private getInitStyleByType(_componentType: WidgetTypes): WidgetStyle {
    const componentType = _componentType as keyof InitDataByTypeMap
    return this.initStyleByTypeMap[componentType] as WidgetStyle
  }

  private createId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private initDataByTypeMap: InitDataByTypeMap = {
    text: {
      text: 'Insert text...'
    },
    image: {
      src: '/assets/tv.png'
    },
    clock: {},
    'today-date': {},
    calendar: {
      meetings: [
        {
          id: this.createId(),
          isStarted: false,
          meetingName: 'Instant Meeting',
          meetingPlatformType: 'teams',
          meetingTime: {
            start: new Date(),
            end: new Date()
          }
        },
        {
          id: this.createId(),
          isStarted: true,
          meetingName: 'Google Meeting (PM)',
          meetingPlatformType: 'google-meeting',
          meetingTime: {
            start: new Date(),
            end: new Date()
          }
        },
        {
          id: this.createId(),
          isStarted: false,
          meetingName: 'David Jays Zoom Meeting',
          meetingPlatformType: 'zoom',
          meetingTime: {
            start: new Date(),
            end: new Date()
          }
        },
      ]
    },
    wifi: {
      wifiName: 'WIFI_1',
      password: '1234'
    }
  }

  private initStyleByTypeMap: InitStyleByTypeMap = {
    text: {
      ...INIT_BASE_WIDGET_STYLE
    },
    image: {
      ...INIT_BASE_WIDGET_STYLE,
      backgroundColor: 'none',
      border: 'none',
      margin: ''
    },
    clock: {
      ...INIT_BASE_WIDGET_STYLE
    },
    'today-date': {
      ...INIT_BASE_WIDGET_STYLE,
      fontSize: '20px'
    },
    calendar: {
      ...INIT_BASE_WIDGET_STYLE
    },
    wifi: {
      ...INIT_BASE_WIDGET_STYLE,
      fontSize: '20px'
    }
  }
}

// export interface Widget extends GridsterItem {
//   data?: WidgetData
//   componentType: WidgetTypes
//   style?: WidgetStyle
//   id: string
// }

// Widget style:
export type WidgetStyle = TextWidgetStyle | ImageWidgetStyle | ClockWidgetStyle | TodayDateWidgetStyle

export interface BaseWidgetStyle {
  color: string
  backgroundColor: string
  border: string
  borderRadius: string
  opacity: string
  margin: string
  fontSize: string
}

export interface TextWidgetStyle extends BaseWidgetStyle {

}

export interface ImageWidgetStyle extends BaseWidgetStyle {
}

export interface ClockWidgetStyle extends BaseWidgetStyle {

}

export interface TodayDateWidgetStyle extends BaseWidgetStyle {

}

export interface CalendarWidgetStyle extends BaseWidgetStyle {

}

export interface WifiWidgetStyle extends BaseWidgetStyle {

}

// Widget data:
type WidgetData = TextWidgetData | ImageWidgetData | CalendarWidgetData | WifiWidgetData

export interface TextWidgetData {
  text: string
}

export interface ImageWidgetData {
  src: string;
}

export interface ClockWidgetData {
}

export interface TodayDateWidgetData {
}

export interface WifiWidgetData {
  wifiName: string
  password: string
}
// Calendar widget models:
export interface CalendarWidgetData {
  meetings: Meeting[]
}

export interface Meeting {
  id: string
  meetingPlatformType: MeetingPlatformTypes
  isStarted: boolean
  meetingName: string
  meetingTime: {
    start: Date
    end: Date
  }
}

export type MeetingPlatformTypes = 'google-meeting' | 'zoom' | 'teams'

// Dashboard options:
export interface DashboardOptions extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

export interface DashboardRowsColsLayoutAndBgColor {
  minRows: number
  maxRows: number
  minCols: number
  maxCols: number
  bgColor: string
}
