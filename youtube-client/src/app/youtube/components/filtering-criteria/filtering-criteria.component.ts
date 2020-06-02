import { YoutubeService } from '../../services/youtube.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filtering-criteria',
  templateUrl: './filtering-criteria.component.html',
  styleUrls: ['./filtering-criteria.component.scss']
})
export class FilteringCriteriaComponent implements OnInit {

  constructor(public youtubeService: YoutubeService) {}

  public onSortBy(order: string): void {
    if (this.youtubeService.sortBy !== order) {
      this.youtubeService.order = `up${order}`;
      this.youtubeService.sortBy = order;
    } else {
      this.youtubeService.order = `down${order}`;
      this.youtubeService.sortBy = '';
    }
  }

  public onFilterbyTitle(keyword: string): void {
    this.youtubeService.title = keyword;
  }

  public ngOnInit(): void {

  }

}
