import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { welcomeScreenRoutes } from './welcome-screen.routes';

@NgModule({
  declarations: [],
  exports: [],
  imports: [RouterModule.forChild(welcomeScreenRoutes)],
})
export class WelcomeScreenModule {}
