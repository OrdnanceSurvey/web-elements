import * as angular from 'angular';
import 'angular-material';
import {DemoComponent} from './demo/demo.component';
import {IComponentsService} from '../../../src/types/IComponentsService';
import 'oclazyload';
import 'angular-marked';

export class DocsComponent implements ng.IComponentOptions {
  controller: Function;
  templateUrl: string;

  constructor() {
    this.controller = DocsCtrl;
    this.templateUrl = 'docs.component.html';
  }
}

export interface IDocsCtrl {
  selectedComponent: string;
  pageUrl: string;
  pageTitle: string;
  setPageTitle(pageTitle: string);
  capitalizeFirstLetters(string): string;
}

class DocsCtrl implements IDocsCtrl {
  selectedComponent: string;
  pageUrl: string;
  pageTitle: string;

  constructor(private $log: ng.ILogService, private $oselDocsConfig: IComponentsService, private $location: ng.ILocationService, private $scope: ng.IScope, private $window: ng.IWindowService) {
    'ngInject';
  }

  $onInit() {
    this.$oselDocsConfig = this.$oselDocsConfig;
    this.$scope.$on('$locationChangeSuccess', this.handleLocationChangeSuccess);
  }

  /*
   Find the component or page name and build the correct url to the .md file
   */
  private handleLocationChangeSuccess = (evt, newUrl: string, oldUrl: string) => {
    let path = this.$location.path(); // e.g. /component/button or /getting-started

    if (/^\/component\//.test(path)) {
      let componentName = path.replace(/^\/component\/([^/]+)$/, '$1');
      this.$log.debug(`location change found component name: ${componentName}`);
      this.pageUrl = `${componentName}/${componentName}.md`;
      this.pageTitle = this.capitalizeFirstLetters(componentName);
    } else {
      let pageName = path.replace(/^\/([^/]+)$/, '$1') || 'getting-started'; // default to getting-started if no page
      this.$log.debug(`location change found page name: ${pageName}`);
      this.pageUrl = 'pages/' + pageName + '.md'; //
    }
  }

  setPageTitle(pageTitle: string) {
    this.pageTitle = pageTitle;
  }

  capitalizeFirstLetters(string): string {
    return string
        .split(' ')
        .map(s => {
          return s.charAt(0).toUpperCase() + string.slice(1);
        })
      .join(' ');
  }
}

export let DocsModule = angular
  .module('osel.docs', ['ngMaterial', 'oc.lazyLoad', 'hc.marked'])
  .component('oselDocs', new DocsComponent())
  .component('oselDocsDemo', new DemoComponent());
