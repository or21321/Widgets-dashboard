import {Component, EventEmitter, HostBinding, Inject, Input, OnInit, Output} from '@angular/core';
import {TextWidgetData, WidgetStyle} from "../../../models/widget.model";
import {WidgetsDashboardService} from "../../../services/widgets-dashboard.service";
import {Store} from "@ngxs/store";
import {DeleteWidget} from "../../../store/dashboard-widgets/dashboard-widgets.actions";

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {
  data: TextWidgetData
  isEdit = false
  id = ''
  style: WidgetStyle

  @Output() removeWidget = new EventEmitter()

  @HostBinding('style') hostStyle = {}

  constructor(private store: Store, @Inject('data') data: TextWidgetData, @Inject('isEdit') isEdit: boolean, @Inject('id') id: string, @Inject('style') style: WidgetStyle) {
    this.data = data
    this.isEdit = isEdit
    this.id = id
    this.style = style
    this.hostStyle = style
  }

  ngOnInit(): void {
  }
  //
  // public remove(ev: Event): void {
  //   ev.stopPropagation()
  //   this.store.dispatch(new DeleteWidget(this.id))
  // }
  //
  // public edit(ev: Event): void {
  //   console.log('edit()')
  // }
}
