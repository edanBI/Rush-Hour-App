import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInstancesComponent } from './game-instances.component';

describe('GameInstancesComponent', () => {
  let component: GameInstancesComponent;
  let fixture: ComponentFixture<GameInstancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameInstancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInstancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
