import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRscannerComponent } from './qrscanner.component';

describe('QRscannerComponent', () => {
  let component: QRscannerComponent;
  let fixture: ComponentFixture<QRscannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRscannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRscannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
