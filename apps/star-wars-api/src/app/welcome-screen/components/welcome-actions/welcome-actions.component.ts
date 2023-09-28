import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';
import { Router } from '@angular/router';
import { StarsBackgroundService } from '../../../common/services/star-background.service';

@Component({
  selector: 'swapi-welcome-actions',
  templateUrl: './welcome-actions.component.html',
  styleUrls: ['./welcome-actions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
})
export class WelcomeActionsComponent {
  constructor(
    classBinder: ClassBinder,
    private _router: Router,
    private _background: StarsBackgroundService
  ) {
    classBinder.bind('swapi-welcome-actions');
  }

  public newGameClick(): void {
    this._router.navigate(['new-game']);
    this._background.startAnimation();
  }
}
