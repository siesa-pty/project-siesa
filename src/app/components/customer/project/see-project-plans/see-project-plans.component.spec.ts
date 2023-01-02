import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProjectPlansComponent } from './see-project-plans.component';

describe('SeeProjectPlansComponent', () => {
  let component: SeeProjectPlansComponent;
  let fixture: ComponentFixture<SeeProjectPlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeProjectPlansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeProjectPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
