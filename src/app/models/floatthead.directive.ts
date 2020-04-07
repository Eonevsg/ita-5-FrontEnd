import {AfterViewInit, Directive, ElementRef} from '@angular/core';

declare var jQuery: any;
require('floatthead/dist/jquery.floatThead.js');

@Directive({
  selector: '[floatthead]'
})
export class FloatThead implements AfterViewInit {
  $el: any;
  private $main: any;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.$el = jQuery(this.elementRef.nativeElement);
    // I used window scroll event so the floathead will only
    // show on window scroll with pageYOffset > 100
    // because, floathead reflow only on window resize but not on table resize
    window.addEventListener('scroll', (e) => this.freezeHeader());
    window.addEventListener('wheel', (e) => this.freezeHeader());
    document.getElementById('main').addEventListener('scroll', (e) => this.freezeHeader());
  }

  freezeHeader() {
    this.$main = document.getElementById('main');

    this.$el.floatThead({
      position: 'absolute',
      top: 0
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', (e) => this.freezeHeader());
  }
}
