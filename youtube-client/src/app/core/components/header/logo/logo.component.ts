import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  public imagePath: string = 'assets/logo.png';

  public imageWidth: number = 50;

  constructor() { }

  public ngOnInit(): void {
  }

}
