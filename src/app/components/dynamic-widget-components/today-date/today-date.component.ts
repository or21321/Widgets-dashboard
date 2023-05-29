import {Component, EventEmitter, HostBinding, Inject, OnInit, Output} from '@angular/core';
import {TextWidgetData, WidgetStyle} from "../../../models/widget.model";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-date-picker',
  templateUrl: './today-date.component.html',
  styleUrls: ['./today-date.component.scss']
})
export class TodayDateComponent implements OnInit {
  isEdit = false
  id = ''
  style: WidgetStyle
  formattedDate!: string
  dayInText!: string

  @Output() removeWidget = new EventEmitter()

  @HostBinding('style') hostStyle = {}

  constructor(private store: Store, @Inject('isEdit') isEdit: boolean, @Inject('id') id: string, @Inject('style') style: WidgetStyle) {
    this.isEdit = isEdit
    this.id = id
    this.style = style
    this.hostStyle = style
  }
  ngOnInit(): void {
    this.getDateOfToday()
  }

  getDateOfToday(): void {
    const formattedDate = this.getFormattedDate();
    console.log(formattedDate); // Example output: 18/5/2023

    const dayInText = this.getDayInText();
    console.log(dayInText); // Example output: Thursday

    this.formattedDate = formattedDate
    this.dayInText = dayInText
  }
  getFormattedDate(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  getDayInText(): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    const dayIndex = date.getDay();

    return daysOfWeek[dayIndex];
  }
}
