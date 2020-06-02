import { YoutubeRoutingModule } from './youtube-routing.module';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { SortingPipe } from './pipes/sorting.pipe';
import { YoutubeService } from './services/youtube.service';
import { ColorBorderDirective } from './directives/color-border.directive';
import { SearchItemComponent } from './components/search-item/search-item.component';
import { FilteringCriteriaComponent } from './components/filtering-criteria/filtering-criteria.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailedPageComponent } from './pages/detailed-page/detailed-page.component';

@NgModule({
  declarations: [
                 SearchResultsComponent,
                 FilteringCriteriaComponent,
                 SearchItemComponent,
                 ColorBorderDirective,
                 SortingPipe,
                 FilterPipe,
                 DetailedPageComponent
                ],
  imports: [
    CommonModule,
    FormsModule,
    YoutubeRoutingModule
  ],
  providers: [YoutubeService],
  // exports: [SearchResultsComponent, FilteringCriteriaComponent, SearchItemComponent]
})
export class YoutubeModule { }
