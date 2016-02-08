/// <reference path="../../../../typings/main.d.ts" />

export class OsHeader {
  static $inject = ['$element'];

  title: string;

  constructor(private $element: ng.IRootElementService) {}

}

