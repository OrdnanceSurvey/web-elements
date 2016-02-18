/// <reference path="../../../../typings/main.d.ts" />

export class OsHeader {
  static $inject = ['$element', '$scope'];

  title: string;
  useSearch: boolean;

  constructor(private $element: ng.IRootElementService, private $scope: ng.IScope) {}

  openSearch() : void {
    this.$scope.$broadcast('osHeader.openSearch');
  }

}

