import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteracceptanceComponent } from './registeracceptance.component';

describe('RegisteracceptanceComponent', () => {
  let component: RegisteracceptanceComponent;
  let fixture: ComponentFixture<RegisteracceptanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteracceptanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteracceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
