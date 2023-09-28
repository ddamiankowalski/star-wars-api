import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('WelcomeComponent', () => {
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(WelcomeComponent);
    fixture.detectChanges();
  });

  it('successfully initializes', () => {
    expect(fixture).toBeDefined();
  });

  it('binds a correct class', () => {
    expect(
      fixture.nativeElement.classList.contains('swapi-welcome')
    ).toBeTruthy();
  });
});
