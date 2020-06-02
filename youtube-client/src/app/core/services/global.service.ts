import { SearchItemStatistic } from './../../youtube/models/search-item.model';
import { SearchResponse, StatisticResponse } from './../../youtube/models/search-response.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private key: string = 'AIzaSyBRuMgdnZ3HqqhdpTC0irn8jMM_hXJVBjQ';
  public isClicked: boolean;
  public searchString: string;
  public response: StatisticResponse;
  public item: SearchItemStatistic;
  public error: boolean = false;
  constructor(private http: HttpClient) { }

  public getData(query: string): Observable<SearchResponse> {
    const url: string = `https://www.googleapis.com/youtube/v3/search?key=${this.key}&type=video&part=snippet&maxResults=15&q=${query}`;
    return this.http.get<SearchResponse>(url);
  }

  public getStatistics(...id: string[]): Observable<StatisticResponse> {
    const url: string = `https://www.googleapis.com/youtube/v3/videos?key=${this.key}&id=${id}&part=snippet,statistics`;
    return this.http.get<StatisticResponse>(url);
  }

}
