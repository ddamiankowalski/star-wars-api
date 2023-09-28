import { NgModule } from '@angular/core';
import { NewGameComponent } from './components/new-game/new-game.component';
import { RouterModule } from '@angular/router';
import { newGameRoutes } from './new-game.routes';
import { GameStateService } from './services/game-state.service';
import { GameCharacterService } from './services/game-character.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [NewGameComponent],
  imports: [RouterModule.forChild(newGameRoutes), HttpClientModule],
  exports: [],
  providers: [GameStateService, GameCharacterService],
})
export class NewGameModule {}
