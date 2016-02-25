/// <reference path="../../../typings/main.d.ts" />
export interface IOsTab {
    ngLink: string;
    click(): void | boolean;
}
export declare class OsTab implements IOsTab {
    private $element;
    private $transclude;
    private $router;
    static $inject: string[];
    ngLink: string;
    constructor($element: ng.IRootElementService, $transclude: ng.ITranscludeFunction, $router: any);
    click(): void | boolean;
}
