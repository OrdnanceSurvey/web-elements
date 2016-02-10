/// <reference path="../../../../typings/main.d.ts" />

export class OsSlider {
  static $inject = ['$element'];

  position: string;
  opened: boolean = false;

  constructor(private $element: ng.IRootElementService) {}

  toggle(): void {
    this.opened = !this.opened;
    if (this.opened) {
      this.$element.addClass('os-slider-opened');
    } else {
      this.$element.removeClass('os-slider-opened');
    }
  }

  isOpened(): boolean {
    return this.opened;
  }

  iconName(): string {
    return this.opened ? 'keyboard_arrow_right' : 'keyboard_arrow_left';
  }

}

