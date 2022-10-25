import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityExtractionComponent } from './components/entity-extraction/entity-extraction.component';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LanguageDetectionComponent } from './components/language-detection/language-detection.component';
import { SentimentAnalysisComponent } from './components/sentiment-analysis/sentiment-analysis.component';
import { TextSimilarityComponent } from './components/text-similarity/text-similarity.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "entity-extraction",
    component: EntityExtractionComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "language-detection",
    component: LanguageDetectionComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "sentiment-analysis",
    component: SentimentAnalysisComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "text-similarity",
    component: TextSimilarityComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: "history",
    component: HistoryComponent,
    canActivate: [AuthGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
