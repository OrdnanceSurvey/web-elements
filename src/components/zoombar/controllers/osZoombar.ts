/// <reference path="../../../../typings/main.d.ts" />


  export interface IOsZoombar {
    ngModel:any;
    ngChange:Function;
    zoomMin:number;
    zoomMax:number;
    zoomIn(): void
    zoomOut(): void
  }

export class OsZoombar implements IOsZoombar {
  static $inject = ['$element'];

    ngModel;
    zoomMin:number;
    ngChange;

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
      let newZoomLevel = Math.min(this.ngModel + 1, this.zoomMax);

      // fire the change function only if value changed
      if (angular.isFunction(this.ngChange) && this.ngModel !== newZoomLevel) {
        this.ngModel = newZoomLevel;
        this.ngChange(this.ngModel);
      } else {
        this.ngModel = newZoomLevel;
      }
    }

    zoomOut() {
      let newZoomLevel = Math.max(this.ngModel - 1, this.zoomMin);

      // fire the change function only if value changed
      if (angular.isFunction(this.ngChange) && this.ngModel !== newZoomLevel) {
        this.ngModel = newZoomLevel;
        this.ngChange(this.ngModel);
      } else {
        this.ngModel = newZoomLevel;
      }
    }

  }

