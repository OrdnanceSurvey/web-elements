/// <reference path="../../../../typings/main.d.ts" />


  export interface IOsZoombar {
    ngModel:number;
    zoomMin:number;
    zoomMax:number;
    zoomIn(): void
    zoomOut(): void
  }

  /**
   * This is class OsZoombar description
   */
  export class OsZoombar implements IOsZoombar {
    static $inject = ['$element'];

    ngModel:number;
    zoomMin:number;

    /**
     * This is property description
     * @var
     */
    zoomMax:number;

    /**
     * This is constructor description
     */
    constructor(private $element:ng.IRootElementService) {
    }

    /**
     * This is method description
     *
     */
    zoomIn() {
      this.ngModel = Math.min(++this.ngModel, this.zoomMax);
    }

    zoomOut() {
      this.ngModel = Math.max(--this.ngModel, this.zoomMin);
    }

  }


