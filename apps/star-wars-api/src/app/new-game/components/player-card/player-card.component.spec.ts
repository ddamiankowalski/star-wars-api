import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCardComponent } from './player-card.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GameCharacterService } from '../../services/game-character.service';
import { GameStateService } from '../../services/game-state.service';
import { DialogModule } from '@angular/cdk/dialog';
import { of } from 'rxjs';
describe('PlayerCardComponent', () => {
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(() => {
    jest.clearAllMocks();

    TestBed.configureTestingModule({
      declarations: [PlayerCardComponent],
      imports: [CommonModule, DialogModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: GameCharacterService,
          useValue: {
            enemyCharacter$: of('ENEMY'),
            playerCharacter$: of('PLAYER'),
          },
        },
        GameStateService,
      ],
    });

    fixture = TestBed.createComponent(PlayerCardComponent);
    fixture.componentRef.setInput('type', 'PLAYER');
    fixture.detectChanges();
  });

  it('successfully initializes', () => {
    expect(fixture).toBeDefined();
  });

  it('binds correct class initially', () => {
    expect(
      fixture.nativeElement.classList.contains('swapi-player-card')
    ).toBeTruthy();
  });

  it('binds modifier class onInit when type is PLAYER', () => {
    expect(
      fixture.nativeElement.classList.contains('swapi-player-card--player')
    ).toBeTruthy();
  });

  it('binds modifier class onInit when type is ENEMY', () => {
    fixture.componentRef.setInput('type', 'ENEMY');
    fixture.componentInstance.ngOnInit();
    expect(
      fixture.nativeElement.classList.contains('swapi-player-card--enemy')
    ).toBeTruthy();
  });

  it('subscribing to character$ returns PLAYER value when type is set to PLAYER on input', () => {
    fixture.componentInstance.character$.subscribe((character) => {
      expect(character).toBe('PLAYER');
    });
  });

  it('subscribing to character$ returns ENEMY value when type is set to ENEMY on input', () => {
    fixture.componentRef.setInput('type', 'ENEMY');
    fixture.detectChanges();

    fixture.componentInstance.character$.subscribe((character) => {
      expect(character).toBe('ENEMY');
    });
  });

  it('winner$ emits when state rundWinner$ emits', () => {
    jest
      .spyOn((fixture.componentInstance as any)._state, 'roundWinner$', 'get')
      .mockReturnValueOnce(of('WINNER'));

    fixture.componentInstance.winner$.subscribe((winner) => {
      expect(winner).toEqual('WINNER');
    });
  });

  it('initially points for PLAYER is 0', () => {
    fixture.componentInstance.points$.subscribe((points) => {
      expect(points).toBe(0);
    });
  });

  it('points$ filters points for PLAYER if input is PLAYER', () => {
    jest
      .spyOn((fixture.componentInstance as any)._state, 'points$', 'get')
      .mockReturnValueOnce(of({ PLAYER: 3, ENEMY: 2 }));

    fixture.componentInstance.points$.subscribe((points) => {
      expect(points).toBe(3);
    });
  });

  it('points$ filters points for ENEMY if input is ENEMY', () => {
    fixture.componentRef.setInput('type', 'ENEMY');
    fixture.detectChanges();

    jest
      .spyOn((fixture.componentInstance as any)._state, 'points$', 'get')
      .mockReturnValueOnce(of({ PLAYER: 3, ENEMY: 2 }));

    fixture.componentInstance.points$.subscribe((points) => {
      expect(points).toBe(2);
    });
  });
});
