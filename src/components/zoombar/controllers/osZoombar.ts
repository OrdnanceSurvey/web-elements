/// <reference path="../../../../typings/main.d.ts" />

export interface IOsZoombar {
  ngModel:number;
  zoomMin:number;
  zoomMax:number;
  zoomIn(): void
  zoomOut(): void
}

export class OsZoombar implements IOsZoombar {
  static $inject = ['$element'];

  ngModel:number;
  zoomMin:number;
  zoomMax:number;

  constructor(private $element: ng.IRootElementService) {}

  zoomIn() {
    this.ngModel = Math.min(++this.ngModel, this.zoomMax);
  }

  zoomOut() {
    this.ngModel = Math.max(--this.ngModel, this.zoomMin);
  }

}

