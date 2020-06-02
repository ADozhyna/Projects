import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SearchResultsComponent },
  { path: ':id', component: DetailedPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeRoutingModule { }
