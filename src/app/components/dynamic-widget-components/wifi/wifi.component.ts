import {Component, EventEmitter, HostBinding, Inject, OnInit, Output} from '@angular/core';
import {WidgetStyle, WifiWidgetData} from "../../../models/widget.model";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.component.html',
  styleUrls: ['./wifi.component.scss']
})
export class WifiComponent implements OnInit {
  data: WifiWidgetData
  isEdit = false
  id = ''
  style: WidgetStyle

  @Output() removeWidget = new EventEmitter()

  @HostBinding('style') hostStyle = {}

  constructor(private store: Store, @Inject('data') data: WifiWidgetData, @Inject('isEdit') isEdit: boolean, @Inject('id') id: string, @Inject('style') style: WidgetStyle) {
    this.data = data
    this.isEdit = isEdit
    this.id = id
    this.style = style
    this.hostStyle = style
  }

  ngOnInit(): void {
  }

}
