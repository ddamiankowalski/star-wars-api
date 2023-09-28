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
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NewGameComponent, GameLoaderComponent, PlayerCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(newGameRoutes),
    HttpClientModule,
    MatProgressSpinnerModule,
    DialogModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [],
  providers: [GameStateService, GameCharacterService],
})
export class NewGameModule {}
