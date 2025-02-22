import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledGoalComponent } from './scheduled-goal.component';

describe('ScheduledGoalComponent', () => {
  let component: ScheduledGoalComponent;
  let fixture: ComponentFixture<ScheduledGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
