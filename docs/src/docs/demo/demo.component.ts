import * as angular from 'angular';
import 'angular-material';
import 'oclazyload';

export class DemoComponent implements ng.IComponentOptions {
  controller: Function;
  templateUrl: string;
  bindings: any;

  constructor() {
    this.controller = DemoCtrl;
    this.templateUrl = 'demo.component.html';
    this.bindings = {
      title: '@oselTitle',
      externalHtml: '@oselHtml',
      externalJs: '@oselJs'
    };
  }
}

export interface IDemoCtrlBindings {
  title: string;
  externalHtml: string;
  externalJs?: string;
}

export interface IDemoCtrl extends IDemoCtrlBindings {
  htmlUrl: string;
  htmlSource: string;
}

class DemoCtrl implements IDemoCtrl {
  // component bindings
  title: string;
  externalHtml: string;
  externalJs: string;

  // public members
  htmlUrl: string;
  htmlSource: string;

  constructor(private $templateCache: ng.ITemplateCacheService, private $location: ng.ILocationService, private $ocLazyLoad) {
    'ngInject';
  }

  $onInit() {

    let path = this.$location.path();
    let componentName = path.replace(/^\/component\/([^/]+)$/, '$1');

    if (this.externalJs) {
      this.initJs(componentName);
    } else {
      this.initHtml(componentName);
    }
  }

  private initJs(componentName: string) {
    let jsToLoad = componentName + '/' + this.externalJs;
    console.log('lazy load the js: ' + jsToLoad);
    this.$ocLazyLoad.load(jsToLoad).then(response => {
      console.log('completed lazy load for: ' + jsToLoad);
      this.initHtml(componentName);
    });
  }

  private initHtml(componentName: string) {
    let htmlToLoad = componentName + '/' + this.externalHtml;

    // set the htmlUrl so that ngInclude begins
    console.log('try to use externalHtml', htmlToLoad);
    this.htmlUrl = htmlToLoad;
  }

  private included = () => {
    this.htmlSource = this.$templateCache.get(this.htmlUrl) as string;
  }


}
