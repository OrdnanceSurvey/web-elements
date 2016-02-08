/// <reference path="../../../../typings/main.d.ts" />

export class OsToolbar {
  static $inject = ['$element'];

  direction: string;

  constructor(private $element: ng.IRootElementService) {}

  getOrientation(): string {
    return this.direction == 'vertical' ? 'column': 'row';
  }

  isVertical(): boolean {
    return this.direction == 'vertical'
  }
}

