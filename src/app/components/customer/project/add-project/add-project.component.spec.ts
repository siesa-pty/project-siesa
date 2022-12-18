import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectCustomerComponent } from './add-project.component';

describe('AddProjectCustomerComponent', () => {
  let component: AddProjectCustomerComponent;
  let fixture: ComponentFixture<AddProjectCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
