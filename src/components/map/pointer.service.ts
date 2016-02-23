/// <reference path="../../../typings/main.d.ts" />

import * as ol from 'openlayers';

//export type PointerType = "grabbable" | "grabbing" | "clickable";

export interface IPointerService {
  setPointer(viewport: HTMLElement, type: string): ng.IPromise<{}>;
}


export class PointerService implements IPointerService {

  constructor(private $q: ng.IQService) {
  }


  setPointer(viewport: HTMLElement, type: string): ng.IPromise<{}>{
    var deferred = this.$q.defer();

    angular.element(viewport)
      .removeClass('grabbing')
      .removeClass('grabbable')
      .removeClass('clickable')
      .addClass(type);

    deferred.resolve(type);
    return deferred.promise;
  }

}

export class PointerServiceProvider {

  $get = ['$q', ($q: ng.IQService) => {
    return new PointerService($q);
  }];

}
