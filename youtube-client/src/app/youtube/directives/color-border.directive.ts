import { Directive, ElementRef, Renderer2, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appColorBorder]'
})
export class ColorBorderDirective implements OnChanges {
  private colorBorder: string;

  @Input() public publicationDate: string;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
    this.setBorder(`${this.colorBorder}`);
   }

   private setBorder(color: string): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'border-bottom', `5px solid ${color}`);
  }

  public ngOnChanges(): void {
    this.colorBorder = 'black';

    const date: Date = new Date(this.publicationDate);

    const days: number = Math.ceil(Math.abs(Date.now() - date.getTime()) / (1000 * 3600 * 24));

    if (days < 31) {
      this.colorBorder = 'green';
    }
    if (days < 7) {
      this.colorBorder = 'blue';
    }
    if (days > 180) {
      this.colorBorder = 'red';
    }
    if (days < 180 && days > 31) {
      this.colorBorder = 'yellow';
    }
    this.setBorder(`${this.colorBorder}`);
  }

}
