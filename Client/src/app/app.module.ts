import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ConstantsService } from './common/services/constants.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConsentComponent } from './consnt/consent.component';
import { ThanksComponent } from './thanks/thanks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DemographicQuestionnaireComponent } from './demographic-questionnaire/demographic-questionnaire.component';
import { InstructionComponent } from './instruction/instruction.component';
import { GameComponent } from './game/game.component';
import { GameQuestionsComponent } from './game-questions/game-questions.component';
import { GameInstancesComponent } from './game-instances/game-instances.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NoopAnimationsModule } from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from '@angular/material/select'
import {MatButtonModule} from '@angular/material/button'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { RefreshComponent } from './refresh/refresh.component'


@NgModule({
  declarations: [
    AppComponent,
    ConsentComponent,
    ThanksComponent,
    PageNotFoundComponent,
    DemographicQuestionnaireComponent,
    InstructionComponent,
    GameComponent,
    GameQuestionsComponent,
    GameInstancesComponent,
    RefreshComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [ConstantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
