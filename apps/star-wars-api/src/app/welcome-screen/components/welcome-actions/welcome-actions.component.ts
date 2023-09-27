import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';

@Component({
  selector: 'swapi-welcome-actions',
  templateUrl: './welcome-actions.component.html',
  styleUrls: ['./welcome-actions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ClassBinder],
})
export class WelcomeActionsComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('swapi-welcome-actions');
  }
}
