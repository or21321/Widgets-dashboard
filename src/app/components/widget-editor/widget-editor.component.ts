import { Component, OnInit } from '@angular/core';
import {Widget, WidgetTypes} from "../../models/widget.model";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {WidgetsDashboardService} from "../../services/widgets-dashboard.service";
import {Store} from "@ngxs/store";
import {AddWidget} from "../../store/dashboard-widgets/dashboard-widgets.actions";

@Component({
  selector: 'widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.scss']
})
export class WidgetEditorComponent implements OnInit {
  widgetForm = this.fb.group({
    widgetType: this.fb.control(''),
    data: this.fb.group({})
  })

  widgetTypes: WidgetTypes[] = [
    'today-date',
    'clock',
    'image',
    'text'
  ]

  get widgetFormType(): AbstractControl | null {
    return this.widgetForm.get('widgetType')
  }

  get widgetFormData(): FormGroup | null {
    return this.widgetForm.get('data') as FormGroup
  }

  constructor(private fb: FormBuilder, private widgetsDashboardService: WidgetsDashboardService
  , private store: Store) {
    this.widgetForm.get('widgetType')?.valueChanges.subscribe((val) => {
      if (val === 'text') {
        setTimeout(() => {
          this.widgetFormData?.reset()
          this.widgetFormData?.addControl('text', this.fb.control(''))
        })
      }
    })
  }

  ngOnInit(): void {
  }

  getControl(group: AbstractControl | null, control: string): AbstractControl | null {
    if (!group) return null
    return group.get(control)
  }

  add(): void {
    console.log('add', this.widgetForm)
    // this.widgetsDashboardService.addWidget(this.widgetForm.value as Widget)
    this.store.dispatch(new AddWidget(this.widgetForm.value as Widget))
  }
}
