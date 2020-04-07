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
    if (this.$main.scrollLeft !== this.scrollLeft) {

      this.scrollLeft = this.$main.scrollLeft;
      this.$el.floatThead('reflow');
    }
    if (document.scrollingElement.scrollTop !== this.scrollTop) {
      this.index = 0;
      this.$el.floatThead({
        position: 'fixed',
        top: 0
      });
      this.scrollTop = document.scrollingElement.scrollTop;
      console.log('fixed');
    }
    console.log(this.scrollLeft, this.scrollTop);
    //console.log(window.pageYOffset);

    //this.$el.floatThead('reflow');
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', (e) => this.freezeHeader());
  }
}
