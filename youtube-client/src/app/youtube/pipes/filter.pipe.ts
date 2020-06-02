import { SearchItem } from '../models/search-item.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

 public transform(items: SearchItem[], keyword: string): object {
    if (!items || !keyword) {
      return items;
    }

    return items.filter((item) => item.snippet.title.toLowerCase().includes(keyword.toLowerCase()));
  }

}
