import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { welcomeScreenRoutes } from './welcome-screen.routes';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WelcomeActionsComponent } from './components/welcome-actions/welcome-actions.component';

@NgModule({
  declarations: [WelcomeComponent, WelcomeActionsComponent],
  exports: [],
  imports: [RouterModule.forChild(welcomeScreenRoutes), MatButtonModule],
})
export class WelcomeScreenModule {}
