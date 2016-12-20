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
      title: '@oselTitle',
      demoUrl: '@oselHtml'
    };
  }
}

export interface IDemoCtrlBindings {
  title: string;
  demoUrl: string;
}

export interface IDemoCtrl extends IDemoCtrlBindings {
  htmlUrl: string;
  htmlSource: string;
}

class DemoCtrl implements IDemoCtrl {
  // component bindings
  title: string;
  demoUrl: string;

  // public members
  htmlUrl: string;
  htmlSource: string;

  constructor(private $templateCache: ng.ITemplateCacheService, private $location: ng.ILocationService) {
    'ngInject';
  }

  $onInit() {
    let path = this.$location.path();
    let componentName = path.replace(/^\/component\/([^/]+)$/, '$1');
    console.log('try to use demoUrl', this.demoUrl);
    this.htmlUrl = componentName + '/' + this.demoUrl;
  }

  private included = () => {
    this.htmlSource = this.$templateCache.get(this.htmlUrl) as string;
  }


}
