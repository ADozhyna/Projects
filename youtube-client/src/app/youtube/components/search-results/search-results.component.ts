import { GlobalService } from './../../../core/services/global.service';
import { catchError } from 'rxjs/operators';
import { SearchResponse, StatisticResponse } from './../../models/search-response.model';
import { YoutubeService } from '../../services/youtube.service';
import { Component, OnInit, Input } from '@angular/core';
import { empty } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public response: StatisticResponse = this.globalService.response;

  public item: object;

  constructor(public youtubeService: YoutubeService,  public globalService: GlobalService) { }

  public ngOnInit(): void {

  }

}
