/// <reference path="../../../typings/main.d.ts" />
import IScope = angular.IScope;
export interface IOsPopover {
    toggle(): boolean;
}
export declare class OsPopover {
    private $element;
    private $transclude;
    private $mdUtil;
    static $inject: string[];
    private parent;
    osDirection: string;
    visible: boolean;
    autoshow: any;
    type: string;
    private tooltipParent;
    private parentRect;
    private tipRect;
    title: string;
    subtitle: string;
    mainImage: string;
    leftImage: string;
    backgroundImage: string;
    description: string;
    actions: string;
    width: string;
    height: string;
    static TOOLTIP_WINDOW_EDGE_SPACE: number;
    static ARROW_HEIGHT: number;
    constructor($element: ng.IRootElementService, $transclude: ng.ITranscludeFunction, $mdUtil: any, $scope: IScope);
    private postLink();
    setParent(element: any): void;
    private enterHandler();
    toggleVisibility(visible: boolean): void;
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
    hasLeftImage(): boolean;
}
