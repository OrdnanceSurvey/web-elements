import * as angular from 'angular';
import 'angular-material';

export class DemoComponent implements ng.IComponentOptions {
  controller: Function;
  templateUrl: string;
  bindings: any;

  constructor() {
    this.controller = DemoCtrl;
    this.templateUrl = 'demo.component.html';
    this.bindings = {
    };
  }
}

export interface IDemoCtrl {
  htmlUrl: string;
  htmlSource: string;
}

class DemoCtrl implements IDemoCtrl {
  htmlUrl: string;
  htmlSource: string;

  constructor(private $attrs: ng.IAttributes, private $templateCache: ng.ITemplateCacheService, private $location: ng.ILocationService) {
    'ngInject';
  }

  $onInit() {
    let path = this.$location.path();
    let componentName = path.replace(/^\/component\/([^/]+)$/, '$1');

    this.htmlUrl = componentName + '/' + this.$attrs['html'];
  }

  private included = () => {
    this.htmlSource = this.$templateCache.get(this.htmlUrl) as string;
  }


}
