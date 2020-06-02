import { SearchItem } from '../models/search-item.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})

export class SortingPipe implements PipeTransform {

  public transform(items: SearchItem[], order: string): unknown {
    switch (order) {
      case 'upDate': {
        return items.sort((a: SearchItem, b: SearchItem) => {
          const dateA: Date = new Date(a.snippet.publishedAt);
          const dateB: Date = new Date(b.snippet.publishedAt);
          if (dateA < dateB) {
            return 1;
          }
          if (dateA > dateB) {
            return -1;
          }
        });
      }
      case 'downDate': {
        return items.sort((a: SearchItem, b: SearchItem) => {
          const dateA: Date = new Date(a.snippet.publishedAt);
          const dateB: Date = new Date(b.snippet.publishedAt);
          if (dateA < dateB) {
            return -1;
          }
          if (dateA > dateB) {
            return 1;
          }
        });
      }
      case 'upViewCount': {
        return items.sort((a: SearchItem, b: SearchItem) => {
          if (+a.statistics.viewCount < +b.statistics.viewCount) {
            return -1;
          }
          if (+a.statistics.viewCount > +b.statistics.viewCount) {
            return 1;
          }
        });
      }
      case 'downViewCount': {
        return items.sort((a: SearchItem, b: SearchItem) => {
          if (+a.statistics.viewCount < +b.statistics.viewCount) {
            return 1;
          }
          if (+a.statistics.viewCount > +b.statistics.viewCount) {
            return -1;
          }
        });
      }
     default:
        return items;
    }

  }

}
