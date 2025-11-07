import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransfer } from './data-transfer';

describe('DataTransfer', () => {
  let component: DataTransfer;
  let fixture: ComponentFixture<DataTransfer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataTransfer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTransfer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
