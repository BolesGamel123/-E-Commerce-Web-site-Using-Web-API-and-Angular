import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighLight]'
})
export class HighLightDirective {

  constructor(public elem:ElementRef) { 

  }
  
  @HostListener('mouseenter') onMouseEnter() {
    this.elem.nativeElement.style.background='red';
    this.elem.nativeElement.style.fontweight='bold';
    this.elem.nativeElement.style.color='white';
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.elem.nativeElement.style.background='white';
    this.elem.nativeElement.style.fontweight='25px';
    this.elem.nativeElement.style.color='Black';
    
  }

}
