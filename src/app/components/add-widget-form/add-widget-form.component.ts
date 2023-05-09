import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {WidgetTypes} from "../../app.component";
import {Widget, WidgetsDashboardService} from "../../services/widgets-dashboard.service";

@Component({
  selector: 'app-add-widget-form',
  templateUrl: './add-widget-form.component.html',
  styleUrls: ['./add-widget-form.component.scss']
})
export class AddWidgetFormComponent implements OnInit {
  widgetForm = this.fb.group({
    widgetType: this.fb.control(''),
    data: this.fb.group({})
  })

  widgetTypes: WidgetTypes[] = [
    'date-picker',
    'time-picker',
    'image',
    'text'
  ]

  get widgetFormType(): AbstractControl | null {
    return this.widgetForm.get('widgetType')
  }

  get widgetFormData(): FormGroup | null {
    return this.widgetForm.get('data') as FormGroup
  }

  constructor(private fb: FormBuilder, private widgetsDashboardService: WidgetsDashboardService) {
    this.widgetForm.get('widgetType')?.valueChanges.subscribe((val) => {
      console.log("val:", val)
      if (val === 'text') {
        setTimeout(() => {
          this.widgetFormData?.reset()
          this.widgetFormData?.addControl('text', this.fb.control(''))
          console.log("this.widgetForm:", this.widgetForm)
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
    this.widgetsDashboardService.addWidget(this.widgetForm.value as Widget)
  }

}
