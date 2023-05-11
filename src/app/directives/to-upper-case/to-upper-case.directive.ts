import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appToUpperCase]'
})
export class ToUpperCaseDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.toUpperCase();
  }

  @HostListener('input', ['$event']) private onInput($event) {
    this.toUpperCase();
  }

  private toUpperCase(){
    (this.el.nativeElement as HTMLInputElement).value = (this.el.nativeElement as HTMLInputElement).value.toUpperCase();
  }

}
