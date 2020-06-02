import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { FormControl } from '@angular/forms';
import { filter, switchMap, debounceTime, catchError, mergeMap } from 'rxjs/operators';
import { empty } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public findControl: FormControl = new FormControl();

  constructor(public globalService: GlobalService) { }

  public onSearch(request: string): void {
    this.globalService.searchString = request;
  }

  public onShowingPanel(): void {
    if (!this.globalService.isClicked) {
      this.globalService.isClicked = true;
    } else {
      this.globalService.isClicked = false;
    }
  }

  public ngOnInit(): void {
    this.findControl.valueChanges
    .pipe(

      filter(value => value.length > 2),

      debounceTime(500),

      switchMap(value =>
        this.globalService.getData(value).pipe(
          catchError(err => {
            this.globalService.response = null;
            this.globalService.error = true;
            return empty;
          })
        ))
    )
    .subscribe((res => {
      const ids: string[] = res.items.map(item => item.id.videoId);
      this.globalService.getStatistics(...ids)
      .subscribe(result => this.globalService.response = result);

    } ));
  }

}
