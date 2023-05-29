import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentContainerComponent } from './dynamic-component-container.component';

describe('DynamicComponentContainerComponent', () => {
  let component: DynamicComponentContainerComponent;
  let fixture: ComponentFixture<DynamicComponentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicComponentContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicComponentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
