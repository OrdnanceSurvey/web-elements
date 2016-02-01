/// <reference path="../../../typings/main.d.ts" />
export declare class OsPopover {
    private $element;
    private $transclude;
    private $mdUtil;
    static $inject: string[];
    private parent;
    osDirection: string;
    private tooltipParent;
    private parentRect;
    private tipRect;
    title: string;
    subTitle: string;
    mainImage: string;
    leftImage: string;
    backgroundImage: string;
    description: string;
    actions: string;
    width: string;
    height: string;
    static TOOLTIP_WINDOW_EDGE_SPACE: number;
    constructor($element: ng.IRootElementService, $transclude: ng.ITranscludeFunction, $mdUtil: any);
    private postLink();
    private enterHandler();
    private show();
    private hide();
    protected updatePosition(pos: any): void;
    protected getPosition(dir: string): {
        left: any;
        top: number;
    } | {
        left: number;
        top: any;
    };
    protected fitInParent(pos: any): {
        left: any;
        top: any;
    };
    private positionTooltip();
    isWide(): boolean;
}
