import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeActionsComponent } from './welcome-actions.component';
import { By } from '@angular/platform-browser';
describe('SwapiWelcomeActions', () => {
  let fixture: ComponentFixture<WelcomeActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeActionsComponent],
    });

    fixture = TestBed.createComponent(WelcomeActionsComponent);
    fixture.detectChanges();
  });

  it('succesfully initializes', () => {
    expect(fixture).toBeDefined();
  });

  it('binds correct class', () => {
    expect(
      fixture.nativeElement.classList.contains('swapi-welcome-actions')
    ).toBeTruthy();
  });

  it('clicking on newGameButton navigates to new game and starts animation', () => {
    const routerSpy = jest.spyOn(
      (fixture.componentInstance as any)._router,
      'navigate'
    );
    const backgroundSpy = jest.spyOn(
      (fixture.componentInstance as any)._background,
      'startAnimation'
    );
    const newGame = fixture.debugElement.query(By.css('#game-button'));
    newGame.triggerEventHandler('click');
    fixture.detectChanges();

    expect(routerSpy).toHaveBeenCalledWith(['new-game']);
    expect(backgroundSpy).toHaveBeenCalledTimes(1);
  });

  it('clicking on githubButton navigates to a new site', () => {
    const redirectSpy = jest.spyOn(window, 'open');
    const githubButton = fixture.debugElement.query(By.css('#github-acc'));
    githubButton.triggerEventHandler('click');

    expect(redirectSpy).toHaveBeenLastCalledWith(
      'https://github.com/ddamiankowalski?tab=repositories',
      '_blank'
    );
  });
});
