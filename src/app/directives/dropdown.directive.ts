import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;
  constructor() { }
  @HostListener('click') openMenu() {
    this.isOpen = !this.isOpen;
  }
  @HostListener('focusout') closeMenu() {
    this.isOpen = !this.isOpen;
  }
}
