import { GameCharacterService } from './game-character.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GameStateService } from './game-state.service';
import { DialogModule } from '@angular/cdk/dialog';

describe('GameCharacterService', () => {
  let service: GameCharacterService;
  let stateService: GameStateService;
  let httpTestingController: HttpTestingController;

  const mockSuccessResponse = {
    message: 'test-message',
    description: 'test-description',
    result: {
      properties: {
        name: 'test-name',
        gender: 'test-gender',
        model: 'test-model',
        crew: 'test-crew',
        mass: 'test-mass',
      },
      description: 'test-description',
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameCharacterService, GameStateService],
      imports: [HttpClientTestingModule, DialogModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GameCharacterService);
    stateService = TestBed.inject(GameStateService);
  });

  it('successfully initializes', () => {
    expect(service).toBeDefined();
  });

  it('load method resets all characters', () => {
    service.load();
    service.enemyCharacter$.subscribe((character) =>
      expect(character).toBeNull()
    );
    service.playerCharacter$.subscribe((character) =>
      expect(character).toBeNull()
    );
  });

  it('loading is false prior to load call', () => {
    expect(stateService.isLoading).toBeFalsy();
  });

  it('load method sets loading to true', () => {
    service.load();
    expect(stateService.isLoading).toBeTruthy();
  });

  it('load sends two requests on two different endpoints', () => {
    service.load();

    const requests = httpTestingController.match({ method: 'GET' });
    expect(requests.length).toBe(2);
  });

  it('flushing both requests cause state to be not loading and sets gamestate to started', () => {
    service.load();

    const requests = httpTestingController.match({ method: 'GET' });
    requests.forEach((req) => req.flush(mockSuccessResponse));

    expect(stateService.isLoading).toBeFalsy();
    expect(stateService.isStarted).toBeTruthy();
  });

  it('flushing only 1 request does not unset loading', () => {
    service.load();

    const requests = httpTestingController.match({ method: 'GET' });
    requests[0].flush(mockSuccessResponse);

    expect(stateService.isLoading).toBeTruthy();
    expect(stateService.isStarted).toBeFalsy();
  });
});
