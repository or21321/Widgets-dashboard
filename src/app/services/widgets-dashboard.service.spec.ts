import { TestBed } from '@angular/core/testing';

import { WidgetsDashboardService } from './widgets-dashboard.service';

describe('WidgetsDashboardService', () => {
  let service: WidgetsDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetsDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
