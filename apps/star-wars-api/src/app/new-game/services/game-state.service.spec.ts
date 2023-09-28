import { DialogModule } from '@angular/cdk/dialog';
import { GameStateService } from './game-state.service';
import { TestBed } from '@angular/core/testing';
import { GameCharacterType } from '../types/icharacter';
import { GameLoaderComponent } from '../components/game-loader/game-loader.component';
import { GameState, IModel } from '../types/imodel';

describe('GameStateService', () => {
  let service: GameStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogModule],
      providers: [GameStateService],
    });

    service = TestBed.inject(GameStateService);
  });

  it('successfully initializes', () => {
    expect(service).toBeDefined();
  });

  it('isStarted is initially false', () => {
    expect(service.isStarted).toBeFalsy();
  });

  it('characterType is initially PERSON', () => {
    expect(service.characterType).toBe(GameCharacterType.Person);
  });

  it('isLoading is initially false', () => {
    expect(service.isLoading).toBeFalsy();
  });

  it('setLoading sets loading to true', () => {
    service.setLoading();

    expect(service.isLoading).toBeTruthy();
  });

  it('calling setLoading opens loading modal if isLoading was previously falsy', () => {
    const modalSpy = jest.spyOn((service as any)._dialog, 'open');
    service.setLoading();

    expect(modalSpy).toHaveBeenCalledWith(GameLoaderComponent, {
      disableClose: true,
      autoFocus: false,
    });
  });

  it('calling setLoading when isLoading was previously true does not open modal', () => {
    const modalSpy = jest.spyOn((service as any)._dialog, 'open');
    service.setLoading();
    service.setLoading();
    service.setLoading();

    expect(modalSpy).toHaveBeenCalledTimes(1);
  });

  it('calling unsetLoading closes modal', () => {
    service.setLoading();
    const modalSpy = jest.spyOn((service as any)._loadingDialogRef, 'close');
    service.unsetLoading();

    expect(modalSpy).toHaveBeenCalledTimes(1);
  });

  it('modal is not closed when loadingRef is not 0', () => {
    service.setLoading();
    service.setLoading();
    service.setLoading();
    const modalSpy = jest.spyOn((service as any)._loadingDialogRef, 'close');
    service.unsetLoading();

    expect(modalSpy).not.toHaveBeenCalled();
  });

  it('modal is closed when loadingRef is 0', () => {
    service.setLoading();
    service.setLoading();
    service.setLoading();
    const modalSpy = jest.spyOn((service as any)._loadingDialogRef, 'close');
    service.unsetLoading();
    service.unsetLoading();
    service.unsetLoading();

    expect(modalSpy).toHaveBeenCalled();
  });

  it('calling setGameState sets gameState', () => {
    service.setGameState(GameState.Started);
    expect(service.isStarted).toBeTruthy();
  });

  it('calling toggleCharacterType switches to a different type', () => {
    service.toggleCharacterType();
    expect(service.characterType).toBe(GameCharacterType.Starship);
  });

  it('calling comparePoints adds points to a player that has higher value', () => {
    service.comparePoints({ value: 10 } as IModel, { value: 2 } as IModel);

    service.roundWinner$.subscribe((winner) => expect(winner).toBe('PLAYER'));
  });

  it('calling resetPoints resets all points to 0 for both sides and emits a value', () => {
    service.comparePoints({ value: 10 } as IModel, { value: 2 } as IModel);
    service.resetPoints();

    service.points$.subscribe((points) =>
      expect(points).toBe({ PLAYER: 0, ENEMY: 0 })
    );
  });
});
