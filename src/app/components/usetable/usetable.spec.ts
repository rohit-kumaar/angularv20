import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usetable } from './usetable';

describe('Usetable', () => {
  let component: Usetable;
  let fixture: ComponentFixture<Usetable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Usetable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usetable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
