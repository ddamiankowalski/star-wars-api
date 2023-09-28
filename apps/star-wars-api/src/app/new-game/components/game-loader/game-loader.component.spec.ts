import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameLoaderComponent } from './game-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('GameLoaderComponent', () => {
  let fixture: ComponentFixture<GameLoaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
    });

    fixture = TestBed.createComponent(GameLoaderComponent);
  });

  it('successfully initializes', () => {
    expect(fixture).toBeDefined();
  });

  it('binds correct class', () => {
    expect(
      fixture.nativeElement.classList.contains('swapi-game-loader')
    ).toBeTruthy();
  });
});
