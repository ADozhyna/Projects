import { GlobalService } from './../../../core/services/global.service';
import { SearchItemStatistic } from './../../models/search-item.model';
import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-item',
  templateUrl: './search-item.component.html',
  styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {

  @Input() public searchItem: SearchItemStatistic;

  public publicationDate: string = '';

  public id: string = '';

  constructor(public youtubeServise: YoutubeService, public globalService: GlobalService) {
   }

  public ngOnInit(): void {
   this.publicationDate = this.searchItem.snippet.publishedAt;
   this.id = this.searchItem.id;
  }

}
