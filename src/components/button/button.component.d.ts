/// <reference path="../../../typings/main.d.ts" />
export interface IOsButton {
    colour: string;
    variation: string;
}
export declare class OsButton implements IOsButton {
    static $inject: string[];
    colour: any;
    variation: any;
    constructor($element: ng.IRootElementService);
    private getColour(type);
}
