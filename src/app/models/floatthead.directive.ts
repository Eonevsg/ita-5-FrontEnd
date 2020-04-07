import {AfterViewInit, Directive, ElementRef} from '@angular/core';

declare var jQuery: any;
require('floatthead/dist/jquery.floatThead.js');

@Directive({
  selector: '[floatthead]'
})
export class FloatThead implements AfterViewInit {
  $el: any;
  private $main: any;
  private scrollLeft: any;
  private scrollTop: any;
  private index: any;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.$el = jQuery(this.elementRef.nativeElement);
    // I used window scroll event so the floathead will only
    // show on window scroll with pageYOffset > 100
    // because, floathead reflow only on window resize but not on table resize
    window.addEventListener('scroll', (e) => this.freezeHeader());
    //window.addEventListener('wheel', (e) => this.freezeHeader());
    this.$main = document.getElementById('main');
    this.$main.addEventListener('scroll', (e) => this.freezeHeader());
    this.scrollLeft = this.$main.scrollLeft;
    this.scrollTop = document.scrollingElement.scrollTop;
    this.index = 0;
  }

  freezeHeader() {
      this.index = 0;
      this.$el.floatThead({
        position: 'absolute',
        top: 0
      });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', (e) => this.freezeHeader());
  }
}
