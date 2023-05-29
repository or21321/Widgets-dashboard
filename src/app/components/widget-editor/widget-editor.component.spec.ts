import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetEditorComponent } from './widget-editor.component';

describe('WidgetEditorComponent', () => {
  let component: WidgetEditorComponent;
  let fixture: ComponentFixture<WidgetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WidgetEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
