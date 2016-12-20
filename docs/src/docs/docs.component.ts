import * as angular from 'angular';
import 'angular-material';
import {PageComponent} from './page/page.component';
import {DemoComponent} from './demo/demo.component';
import {IComponentsService} from '../../../src/types/IComponentsService';
import * as _ from 'lodash';
// const Flatdoc = require('flatdoc') as any;

export class DocsComponent implements ng.IComponentOptions {
  controller: Function;
  templateUrl: string;

  constructor() {
    this.controller = DocsCtrl;
    this.templateUrl = 'docs.component.html';
  }
}

export interface IDocsComponent {
  name: string;
  url: string;
}

export interface IDocsCtrl {
  components: IDocsComponent[];
  selectedComponent: IDocsComponent;
  pageUrl: string;
  pageTitle: string;
}

class DocsCtrl implements IDocsCtrl {
  components: IDocsComponent[];
  selectedComponent: IDocsComponent;
  pageUrl: string;
  pageTitle: string;

  constructor(private $log: ng.ILogService, private $oselComponents: IComponentsService, private $location: ng.ILocationService, private $scope: ng.IScope, private $window: ng.IWindowService) {
    'ngInject';
    this.$window['Flatdoc'].highlighters.html_old = this.$window['Flatdoc'].highlighters.html;

    this.$window['Flatdoc'].highlighters.html = function (code) {
      console.log('skip HTML syntax highlighting');
      return code;
    };

  }

  $onInit() {
    console.log('initialising DocsCtrl');
    this.components = this.$oselComponents.components.map(componentName => {
      return {
        name: componentName,
        url: componentName + '/' + componentName + '.md'
      };
    });
    this.$scope.$on('$locationChangeSuccess', this.handleLocationChangeSuccess);
  }

  private handleLocationChangeSuccess = (evt, newUrl: string, oldUrl: string) => {
    let path = this.$location.path();
    let componentName = path.replace(/^\/component\/([^/]+)$/, '$1');
    if (componentName) {
      let componentMatch: IDocsComponent = _.find(this.components, {name: componentName});
      if (componentMatch) {
        this.pageUrl = componentMatch.url;
        this.pageTitle = componentName;
      }
    } else {
      this.pageUrl = '';
    }
  }
}

export let DocsModule = angular
  .module('osel.docs', ['ngMaterial'])
  .component('oselDocs', new DocsComponent())
  .component('oselDocsPage', new PageComponent())
  .component('oselDocsDemo', new DemoComponent());
