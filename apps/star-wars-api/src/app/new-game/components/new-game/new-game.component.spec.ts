import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewGameComponent } from './new-game.component';

describe('NewGameComponent', () => {
  let fixture: ComponentFixture<NewGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(NewGameComponent);
  });

  it('successfully initializes', () => {
    expect(fixture).toBeDefined();
  });
});
