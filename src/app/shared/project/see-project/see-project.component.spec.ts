import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeProjectComponent } from './see-project.component';

describe('SeeProjectComponent', () => {
  let component: SeeProjectComponent;
  let fixture: ComponentFixture<SeeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
