/// <reference path="../../../../typings/main.d.ts" />

export class OsSlider {
  static $inject = ['$element'];

  position: string;
  opened: boolean;

  constructor(private $element: ng.IRootElementService) {
    this.setVisibility();
  }

  toggle(): void {
    this.opened = !this.opened;
    this.setVisibility();
  }

  setVisibility() {
    if (this.opened) {
      this.$element.addClass('os-slider-opened');
    } else {
      this.$element.removeClass('os-slider-opened');
    }
  }

  isOpened(): boolean {
    return this.opened == true;
  }

  iconName(): string {
    return this.isOpened() ? 'keyboard_arrow_left' : 'keyboard_arrow_right' ;
  }

}

