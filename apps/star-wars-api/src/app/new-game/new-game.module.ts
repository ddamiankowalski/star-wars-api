import { NgModule } from '@angular/core';
import { NewGameComponent } from './components/new-game/new-game.component';
import { RouterModule } from '@angular/router';
import { newGameRoutes } from './new-game.routes';
import { GameStateService } from './services/game-state.service';
import { GameCharacterService } from './services/game-character.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameLoaderComponent } from './components/game-loader/game-loader.component';
import { DialogModule } from '@angular/cdk/dialog';

@NgModule({
  declarations: [NewGameComponent, GameLoaderComponent],
  imports: [
    RouterModule.forChild(newGameRoutes),
    HttpClientModule,
    MatProgressSpinnerModule,
    DialogModule,
  ],
  exports: [],
  providers: [GameStateService, GameCharacterService],
})
export class NewGameModule {}
