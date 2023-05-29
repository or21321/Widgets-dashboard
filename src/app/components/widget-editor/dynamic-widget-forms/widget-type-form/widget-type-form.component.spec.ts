import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetTypeFormComponent } from './widget-type-form.component';

describe('WidgetTypeFormComponent', () => {
  let component: WidgetTypeFormComponent;
  let fixture: ComponentFixture<WidgetTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
