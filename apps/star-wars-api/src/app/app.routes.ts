import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'welcome-screen',
    loadChildren: () =>
      import('./welcome-screen/welcome-screen.module').then(
        (m) => m.WelcomeScreenModule
      ),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./welcome-screen/welcome-screen.module').then(
        (m) => m.WelcomeScreenModule
      ),
  },
];
