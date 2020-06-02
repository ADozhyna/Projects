import { GlobalService } from './../../../core/services/global.service';
import { SearchItemStatistic } from './../../models/search-item.model';
import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailed-page',
  templateUrl: './detailed-page.component.html',
  styleUrls: ['./detailed-page.component.scss']
})
export class DetailedPageComponent implements OnInit {

  public item: SearchItemStatistic;
  public itemId: string = '';
  public date: Date;
  public publicationDate: string = '';

  constructor(public youtubeServise: YoutubeService,
              public route: ActivatedRoute,
              public globalService: GlobalService) { }

  public backHome(): void {
    this.youtubeServise.back();
  }

  public ngOnInit(): void {
   this.route.params.subscribe(params => {
    this.itemId = params.id;
    this.globalService.getStatistics(this.itemId).subscribe(res => {
    this.item = res.items[0];
    this.publicationDate = this.item.snippet.publishedAt;
    this.date = new Date(this.item.snippet.publishedAt);
     });
   });

  }

}
