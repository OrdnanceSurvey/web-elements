import * as angular from 'angular';
import 'angular-material';

export class PageComponent implements ng.IComponentOptions {
  controller: Function;
  templateUrl: string;
  bindings: any;

  constructor() {
    this.controller = PageCtrl;
    this.templateUrl = 'page.component.html';
    this.bindings = {
      url: '<'
    };
  }
}

export interface IPageCtrl {
  url: string;
}

class PageCtrl implements IPageCtrl {
  url: string;

  constructor(private $log: ng.ILogService,
              private $scope: ng.IScope,
              private $element: ng.IRootElementService,
              private $window: ng.IWindowService,
              private $document: ng.IDocumentService,
              private $compile: ng.ICompileService) {
    'ngInject';
  }

  $onInit() {
    // this.$window.$(document).on('flatdoc:ready', recompile);
    this.$document.on('flatdoc:ready', () => {
      console.log('got flatdoc:ready');
      this.recompile();
    });
  }

  $onChanges(changes) {
    if (changes && changes.hasOwnProperty('url') && changes.url.currentValue) {
      console.log('url changed to: ' + changes.url.currentValue);
      // this.$log.debug('load docs for: ' + newUrl);
      this.$window['Flatdoc'].run({
        fetcher: this.$window['Flatdoc'].file(changes.url.currentValue)
      });

    }
  }

  private recompile() {
    this.$log.debug('recompiling');
    this.$scope.$apply(() => {
      console.log('doing scope.$apply');

      let contents = this.$element.contents();

      contents = this.makeFirstHeaderToolbar(contents);

      this.$compile(contents)(this.$scope);
    });
  }

  private makeFirstHeaderToolbar(contents) {
    let firstHeader = contents.children('h1')[0];
    // this.wrap(firstHeader, '<md-toolbar><div class="md-toolbar-tools">', '</div></md-toolbar>');
    let secondHeader = contents.children('h1')[1];
    // this.wrap(firstHeader, '<md-toolbar><div class="md-toolbar-tools">', '</div></md-toolbar>');
    return contents;
  }

  private wrap(el, before, after) {
    let $el = angular.element(el);
    $el.replaceWith(before + $el.html() + after);
    return $el;
  }

}
