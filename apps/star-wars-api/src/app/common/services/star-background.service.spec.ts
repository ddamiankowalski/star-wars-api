import { StarsBackgroundService } from './star-background.service';

jest.mock('@star-wars-api/star-wars-bg');

describe('StarBackgroundService', () => {
  let service: StarsBackgroundService;

  beforeEach(() => {
    service = new StarsBackgroundService();
  });

  it('successfully initializes', () => {
    expect(service).toBeDefined();
  });

  it('initialize function sucessfully returns an instance of StarsBackground', () => {
    expect(service.initialize({} as HTMLCanvasElement)).toBeDefined();
  });

  it('startAnimation starts animation on background when background is defined', () => {
    service.initialize({} as HTMLCanvasElement);
    const startAnimationSpy = jest.spyOn(
      (service as any)._background,
      'startAnimation'
    );

    service.startAnimation();
    expect(startAnimationSpy).toHaveBeenCalled();
  });

  it('throws an error when startAnimation is called before the background initlization', () => {
    expect(() => service.startAnimation()).toThrow();
  });
});
