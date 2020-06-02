import { Router } from '@angular/router';
import { SearchItem } from './../models/search-item.model';
import { SearchResponse } from './../models/search-response.model';
import { Injectable } from '@angular/core';

@Injectable()
export class YoutubeService {
  public sortBy: string;

  public order: string;

  public title: string;

  public itemId: string;

  public response: SearchResponse;

  public viewedIcon: string = 'assets/viewed.svg';
  public likedIcon: string = 'assets/liked.svg';
  public dislikeIcon: string = 'assets/dislike.svg';
  public commentIcon: string = 'assets/comment.svg';

 // public item: SearchItem;

  constructor(public router: Router) { }

 /*public getItem(id: string): SearchItem {
    //return this.response.items.find((item: SearchItem) => item.id === id);
  } */

 public back(): void {
   this.router.navigateByUrl('/home');

 }
}
