import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicLineExpenseSumComponent } from './strategic-line-expense-sum.component';

describe('StrategicLineExpenseSumComponent', () => {
  let component: StrategicLineExpenseSumComponent;
  let fixture: ComponentFixture<StrategicLineExpenseSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicLineExpenseSumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicLineExpenseSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
