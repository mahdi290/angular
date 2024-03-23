import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhomeserviceComponent } from './addhomeservice.component';

describe('AddhomeserviceComponent', () => {
  let component: AddhomeserviceComponent;
  let fixture: ComponentFixture<AddhomeserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddhomeserviceComponent]
    });
    fixture = TestBed.createComponent(AddhomeserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
