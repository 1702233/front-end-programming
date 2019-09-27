import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingoverviewComponent } from './bookingoverview.component';

describe('BookingoverviewComponent', () => {
  let component: BookingoverviewComponent;
  let fixture: ComponentFixture<BookingoverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingoverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
