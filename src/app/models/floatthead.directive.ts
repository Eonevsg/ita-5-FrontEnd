import {AfterViewInit, Directive, ElementRef, OnDestroy} from '@angular/core';

declare let jQuery;

@Directive({
  selector: '[floatthead]'
})
export class FloattheadDirective implements AfterViewInit, OnDestroy {
  $el: any;
  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.$el = jQuery(this.elementRef.nativeElement);
    window.addEventListener('scroll', (e) => this.freezeHeader());
  }

  freezeHeader() {
      this.$el.floatThead({
        position: 'absolute',
        top: 0
      });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', (e) => this.freezeHeader());
  }
}
