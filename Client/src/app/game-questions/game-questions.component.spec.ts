import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameQuestionsComponent } from './game-questions.component';

describe('GameQuestionsComponent', () => {
  let component: GameQuestionsComponent;
  let fixture: ComponentFixture<GameQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
