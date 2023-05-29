import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {WidgetsDashboardService} from "../../../services/widgets-dashboard.service";
import {Select, Store} from "@ngxs/store";
import {SaveDashboardSettings, SetDashboardBgImg} from "../../../store/dashboard-widgets/dashboard-widgets.actions";
import {Observable} from "rxjs";
import {DashboardOptions, DashboardRowsColsLayoutAndBgColor} from "../../../models/widget.model";
import {WidgetsState} from "../../../store/dashboard-widgets/dashboard-widgets.state";

@Component({
  selector: 'dashboard-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  settingsForm = this.fb.group({
    minRows: this.fb.control(1),
    maxRows: this.fb.control(1),
    minCols: this.fb.control(1),
    maxCols: this.fb.control(1),
    bgColor: this.fb.control('')
  })
  dashboardImgSrc: SafeUrl = ''
  dashboardImgFile: File | null = null

  @Select(WidgetsState.dashboardOptions) dashboardOptions$!: Observable<DashboardOptions>
  @Select(WidgetsState.dashboardBgColor) dashboardBgColor$!: Observable<string>

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer,
              private store: Store) {
  }

  ngOnInit(): void {
    this.dashboardOptions$.subscribe((dashboardOptions) => {
      this.settingsForm.patchValue({
        minRows: dashboardOptions.minRows,
        maxRows: dashboardOptions.maxRows,
        minCols: dashboardOptions.minCols,
        maxCols: dashboardOptions.maxCols
      })
    })
    this.dashboardBgColor$.subscribe((bgColor) => {
      console.log("bgColor:", bgColor)
      this.settingsForm.patchValue({
        bgColor
      })
      console.log("this.settingsForm:", this.settingsForm)
    })
  }

  getControl(group: AbstractControl | null, control: string): AbstractControl | null {
    if (!group) return null
    return group.get(control)
  }

  loadFile(input: HTMLInputElement) {
    if (input.files && input.files.length) {
      const file = input.files[0];
      console.log("file:", file)
      const formData = new FormData();
      // this.dashboardImgSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
      formData.append("file", file, file.name);
      const avatarImgFormData = formData
      //  Todo: Save to cloudinary
      // this.dashboardService.setBgImg(file)
      this.store.dispatch(new SetDashboardBgImg(file))
    }
  }

  save(): void {
    console.log('save settings', this.settingsForm.value)
    if (!this.settingsForm.valid) throw Error("Form isn't valid")

    this.store.dispatch(new SaveDashboardSettings(this.settingsForm.value as DashboardRowsColsLayoutAndBgColor))
  }
}
