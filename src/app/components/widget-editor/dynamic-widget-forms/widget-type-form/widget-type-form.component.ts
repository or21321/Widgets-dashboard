import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {Widget, WidgetTypes} from "../../../../models/widget.model";
import {WidgetsDashboardService} from "../../../../services/widgets-dashboard.service";

@Component({
  selector: 'widget-type-form',
  templateUrl: './widget-type-form.component.html',
  styleUrls: ['./widget-type-form.component.scss']
})
export class WidgetTypeFormComponent implements OnInit {
ngOnInit() {
}
}
