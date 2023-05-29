import {ChangeDetectorRef, Component, HostBinding, Inject, OnInit} from '@angular/core';
import {WidgetStyle} from "../../../models/widget.model";
import {interval} from "rxjs";

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {
  private isEdit = false
  private id = ''
  private style: WidgetStyle

  public currentTime: string = ''
  private subscription!: NodeJS.Timer

  @HostBinding('style') hostStyle = {}

  constructor(@Inject('isEdit') isEdit: boolean, @Inject('id') id: string, @Inject('style') style: WidgetStyle, private cd: ChangeDetectorRef) {
    this.style = style
    this.id = id
    this.isEdit = isEdit
    this.hostStyle = style
  }

  ngOnInit(): void {
    this.getCurrentTime()
    // this.subscription = setInterval(this.getCurrentTime.bind(this), 1500)
    // interval(1000).subscribe(this.getCurrentTime.bind(this))
  }

  ngOnDestroy(): void {
    clearInterval(this.subscription)
  }

  getCurrentTime(): void {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;

    // console.log("this:", this)
    // console.log("this.currentTime:", this.currentTime)
    // const now = new Date();
    // const hours = String(now.getHours()).padStart(2, '0');
    // const minutes = String(now.getMinutes()).padStart(2, '0');
    // const currentTime = `${hours}:${minutes}`;
    // if (currentTime !== this.currentTime) {
    //   console.log("this.currentTime:", this.currentTime)
    //   console.log("currentTime:", currentTime)
    //   this.currentTime = currentTime
    //   console.log('Settings')
    //   this.cd.detectChanges()
    // }
  }
}
