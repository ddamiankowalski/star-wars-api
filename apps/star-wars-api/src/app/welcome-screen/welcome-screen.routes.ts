import { Route } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const welcomeScreenRoutes: Route[] = [
  { path: '', component: WelcomeComponent },
];
