import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ImageWidgetData, ImageWidgetStyle, WidgetStyle} from "../../../models/widget.model";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  data: ImageWidgetData
  isEdit = false
  id = ''
  style: WidgetStyle

  @HostBinding('style') hostStyle = {}

  constructor(private store: Store, @Inject('data') data: ImageWidgetData, @Inject('isEdit') isEdit: boolean, @Inject('id') id: string, @Inject('style') style: ImageWidgetStyle) {
    this.data = data
    this.isEdit = isEdit
    this.id = id
    this.style = style
    this.hostStyle = style
  }

  ngOnInit(): void {
  }

}
