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

  constructor(private $templateCache: ng.ITemplateCacheService, private $location: ng.ILocationService, private $ocLazyLoad, private $log: ng.ILogService) {
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
    this.$log.debug(`Use the demo JS at: ${jsToLoad}`);
    this.$ocLazyLoad.load(jsToLoad).then(response => {
      this.$log.debug(`JS finished lazy loading: ${jsToLoad}`);
      this.initHtml(componentName);
    });
  }

  private initHtml(componentName: string) {
    let htmlToLoad = componentName + '/' + this.externalHtml;

    // set the htmlUrl so that ngInclude begins
    this.$log.debug(`Use the demo HTML at: ${htmlToLoad}`);
    this.htmlUrl = htmlToLoad;
  }

  private included = () => {
    this.htmlSource = this.$templateCache.get(this.htmlUrl) as string;
  }


}
