import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsentComponent } from './consnt/consent.component';
import { ThanksComponent } from './thanks/thanks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemographicQuestionnaireComponent } from './demographic-questionnaire/demographic-questionnaire.component';
import { InstructionComponent } from './instruction/instruction.component';
import { GameComponent } from './game/game.component';
import { RefreshComponent } from './refresh/refresh.component'


const routes: Routes = [
  {path:'', redirectTo: '/consent', pathMatch:'full'},
  {path: 'consent' , component: ConsentComponent},
  {path: 'thanks' , component: ThanksComponent},
  {path: 'demographicQuestionnaire' , component: DemographicQuestionnaireComponent},
  {path: 'instruction' , component: InstructionComponent},
  {path: 'game' , component: GameComponent},
  {path: 'refresh', component: RefreshComponent},
  {path: '**', component: PageNotFoundComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
