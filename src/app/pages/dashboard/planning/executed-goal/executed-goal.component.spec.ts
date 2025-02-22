import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutedGoalComponent } from './executed-goal.component';

describe('ExecutedGoalComponent', () => {
  let component: ExecutedGoalComponent;
  let fixture: ComponentFixture<ExecutedGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutedGoalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutedGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
