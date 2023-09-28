import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewGameComponent } from './new-game.component';
import { GameCharacterService } from '../../services/game-character.service';
import { GameStateService } from '../../services/game-state.service';
import { StarsBackgroundService } from '../../../common/services/star-background.service';
import { RouterTestingModule } from '@angular/router/testing';
import { GameCharacterType } from '../../types/icharacter';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '@angular/cdk/dialog';
import { By } from '@angular/platform-browser';
import { PlayerCardComponent } from '../player-card/player-card.component';
import { GameState } from '../../types/imodel';

describe('NewGameComponent', () => {
  let fixture: ComponentFixture<NewGameComponent>;
  const loadCharacterSpy = jest.fn();
  const startAnimationSpy = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      imports: [CommonModule, DialogModule, MatButtonModule],
      declarations: [NewGameComponent, PlayerCardComponent],
      providers: [
        { provide: GameCharacterService, useValue: { load: loadCharacterSpy } },
        GameStateService,
        {
          provide: StarsBackgroundService,
          useValue: { startAnimation: startAnimationSpy },
        },
        RouterTestingModule,
      ],
    });

    fixture = TestBed.createComponent(NewGameComponent);
    fixture.componentInstance.state.setGameState(GameState.Started);
    fixture.detectChanges();
  });

  it('successfully initializes', () => {
    expect(fixture).toBeDefined();
  });

  it('binds correct class', () => {
    expect(
      fixture.nativeElement.classList.contains('swapi-new-game')
    ).toBeTruthy();
  });

  it('calls load method once when onInit is called', () => {
    jest.clearAllMocks();
    fixture.componentInstance.ngOnInit();
    expect(loadCharacterSpy).toHaveBeenCalledTimes(1);
  });

  it('inactiveType returns Starships when characterType is equal to PERSON', () => {
    jest
      .spyOn(fixture.componentInstance.state, 'characterType', 'get')
      .mockReturnValue(GameCharacterType.Person);
    expect(fixture.componentInstance.inactiveType).toBe('Starships');
  });

  it('inactiveType returns People when characterType is equal to STARSHIP', () => {
    jest
      .spyOn(fixture.componentInstance.state, 'characterType', 'get')
      .mockReturnValue(GameCharacterType.Starship);
    expect(fixture.componentInstance.inactiveType).toBe('People');
  });

  it('clicking on nextRound button loads characters', () => {
    jest.clearAllMocks();
    const nextRound = fixture.debugElement.query(By.css('#next-round'));
    nextRound.triggerEventHandler('click');
    fixture.detectChanges();

    expect(loadCharacterSpy).toHaveBeenCalledTimes(1);
  });

  it('clicking on nextRound starts an animation', () => {
    const nextRound = fixture.debugElement.query(By.css('#next-round'));
    nextRound.triggerEventHandler('click');
    fixture.detectChanges();

    expect(startAnimationSpy).toHaveBeenCalledTimes(1);
  });

  it('clicking on toggleCharacterType calls toggleCharacterType', () => {
    const toggleTypeSpy = jest.spyOn(
      fixture.componentInstance.state,
      'toggleCharacterType'
    );
    const nextRound = fixture.debugElement.query(By.css('#toggle-character'));
    nextRound.triggerEventHandler('click');
    fixture.detectChanges();

    expect(toggleTypeSpy).toHaveBeenCalledTimes(1);
  });

  it('clicking onQuit navigates to main dashboard', () => {
    const navigateSpy = jest.spyOn(
      (fixture.componentInstance as any)._router,
      'navigate'
    );
    const resetPointsSpy = jest.spyOn(
      fixture.componentInstance.state,
      'resetPoints'
    );
    const nextRound = fixture.debugElement.query(By.css('#on-quit'));
    nextRound.triggerEventHandler('click');
    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith(['']);
    expect(resetPointsSpy).toHaveBeenCalledTimes(1);
  });
});
