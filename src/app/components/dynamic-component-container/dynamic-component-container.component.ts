import {Component, Injector, Input, OnInit} from '@angular/core';
import {Widget} from "../../models/widget.model";
import {ImageComponent} from "../dynamic-widget-components/image/image.component";
import {TextComponent} from "../dynamic-widget-components/text/text.component";
import {DeleteWidget} from "../../store/dashboard-widgets/dashboard-widgets.actions";
import {Store} from "@ngxs/store";
import {ClockComponent} from "../dynamic-widget-components/clock/clock.component";
import {CalendarComponent} from "../dynamic-widget-components/calendar/calendar.component";
import {TodayDateComponent} from "../dynamic-widget-components/today-date/today-date.component";
import {WifiComponent} from "../dynamic-widget-components/wifi/wifi.component";

interface DynamicWidgetComponents {
  image: typeof ImageComponent,
  text: typeof TextComponent,
  clock: typeof ClockComponent,
  "today-date": typeof TodayDateComponent,
  calendar: typeof CalendarComponent,
  wifi: typeof WifiComponent
}

enum WidgetTypesEnum {
  'image' = 'image',
  'text' = 'text',
  'clock' = 'clock',
  'today-date' = 'today-date',
  'calendar' = 'calendar',
  'wifi' = 'wifi'
}

@Component({
  selector: 'dynamic-component-container',
  templateUrl: './dynamic-component-container.component.html',
  styleUrls: ['./dynamic-component-container.component.scss']
})
export class DynamicComponentContainerComponent implements OnInit {
  dynamicWidgetComponents: DynamicWidgetComponents = {
    [WidgetTypesEnum["clock"]]: ClockComponent,
    [WidgetTypesEnum['today-date']]: TodayDateComponent,
    [WidgetTypesEnum['image']]: ImageComponent,
    [WidgetTypesEnum['text']]: TextComponent,
    [WidgetTypesEnum['calendar']]: CalendarComponent,
    [WidgetTypesEnum['wifi']]: WifiComponent
  }

  @Input() widget!: Widget
  @Input() isEditMode!: boolean

  constructor(private inj: Injector, private store: Store) { }

  ngOnInit(): void {
  }


  getDynamicComponent(widget: Widget): any {
    return this.dynamicWidgetComponents[this.getDynamicComponentType(widget)]
  }

  getDynamicComponentType(widget: Widget): keyof DynamicWidgetComponents {
    return widget.componentType
  }

  createInjectorForDynamicComponent(item: Widget) {
    let injector = Injector.create({
      providers: [
        {provide: 'data', useValue: item.data},
        {provide: 'isEdit', useValue: this.isEditMode},
        {provide: 'id', useValue: item.id},
        {provide: 'style', useValue: item.style}
      ],
      parent: this.inj
    });
    return injector;
  }

  public remove(ev: Event): void {
    ev.stopPropagation()
    this.store.dispatch(new DeleteWidget(this.widget.id))
  }

  public edit(ev: Event): void {
    console.log('edit()')
  }
}
