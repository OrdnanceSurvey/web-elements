/// <reference path="../../../typings/main.d.ts" />
export interface IOsButton {
    colour: string;
    variation: string;
    disabled: boolean;
    makeClass: any;
}
export declare class OsButton implements IOsButton {
    static $inject: string[];
    colour: any;
    variation: any;
    disabled: any;
    makeClass: any;
    constructor($element: ng.IRootElementService);
}
