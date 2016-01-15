/// <reference path="../../../typings/main.d.ts" />
export interface IOsButton {
    colour: string;
    variation: string;
    disabled: boolean;
}
export declare class OsButton implements IOsButton {
    static $inject: string[];
    colour: any;
    variation: any;
    disabled: any;
    constructor($element: ng.IRootElementService);
}
