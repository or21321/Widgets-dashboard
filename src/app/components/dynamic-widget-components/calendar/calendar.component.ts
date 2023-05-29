import {ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {CalendarWidgetData, Meeting, WidgetStyle} from "../../../models/widget.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  private isEdit = false
  private id = ''
  public style: WidgetStyle
  public data: CalendarWidgetData

  @HostBinding('style') hostStyle = {}

  get meetings(): Meeting[] {
    return this.data.meetings
  }

  constructor(@Inject('data') data: CalendarWidgetData, @Inject('isEdit') isEdit: boolean, @Inject('id') id: string, @Inject('style') style: WidgetStyle, private cd: ChangeDetectorRef) {
    this.style = style
    this.id = id
    this.isEdit = isEdit
    this.data = data
    this.hostStyle = {
      ...style,
      backgroundColor: null
    }
    console.log("style:", style)
    console.log("data:", data)
  }

  ngOnInit(): void {
  }

  startMeeting(id: string): void {
    console.log("id:", id)
  }

  joinMeeting(id: string): void {
    console.log("id:", id)
  }
}
