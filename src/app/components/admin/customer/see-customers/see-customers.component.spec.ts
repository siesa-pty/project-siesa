import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeCustomersComponent } from './see-customers.component';

describe('SeeCustomersComponent', () => {
  let component: SeeCustomersComponent;
  let fixture: ComponentFixture<SeeCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
