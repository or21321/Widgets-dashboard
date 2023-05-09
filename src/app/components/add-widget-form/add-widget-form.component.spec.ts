import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWidgetFormComponent } from './add-widget-form.component';

describe('AddWidgetFormComponent', () => {
  let component: AddWidgetFormComponent;
  let fixture: ComponentFixture<AddWidgetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWidgetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWidgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
