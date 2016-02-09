/// <reference path="../../../typings/main.d.ts" />

import IServiceProvider = angular.IServiceProvider;
export class OsPopover {
  static $inject = ['$element', '$transclude', '$mdUtil', '$window'];

  private parent;

  osDirection:string;
  visible: boolean = false;
  autoshow: any;
  type: string;

  private tooltipParent;
  private parentRect;
  private tipRect;

  title:string;
  subTitle:string;
  mainImage:string;
  leftImage:string;
  backgroundImage:string;
  description:string;
  actions:string;

  width:string;
  height:string;

  static TOOLTIP_WINDOW_EDGE_SPACE = 8;

  constructor(private $element:ng.IRootElementService, private $transclude:ng.ITranscludeFunction, private $mdUtil:any, $window: any) {
    this.tooltipParent = angular.element(document.body);

    this.postLink();

    this.tooltipParent.append($element);
  }

  private postLink() {
    this.parent = this.$mdUtil.getParentWithPointerEvents(this.$element);

    if (this.autoshow) {
      this.parent.on('focus mouseenter touchstart', this.enterHandler.bind(this));
    }
  }

  setParent(element) {
    this.parent = angular.element(element);

    if (this.autoshow) {
      this.parent.on('focus mouseenter touchstart', this.enterHandler.bind(this));
    }
  }

  private enterHandler() {
    this.show();
  }

  toggleVisibility(visible: boolean) {
    this.visible = visible;
    this.visible ? this.show(): this.hide();
  }

  private show() {
    this.visible = true;
    this.$element.css('display', 'block');
    this.positionTooltip();
  }

  private hide() {
    this.visible = false;
    this.$element.css('display', 'none');
  }

  protected updatePosition(pos) {
    this.$element.css({
      left: pos.left + 'px',
      top: pos.top + 'px'
    });
  }

  protected getPosition(dir:string) {
    return dir === 'left'
      ? {
      left: this.parentRect.left - this.tipRect.width - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE,
      top: this.parentRect.top + this.parentRect.height / 2 - this.tipRect.height / 2
    }
      : dir === 'right'
      ? {
      left: this.parentRect.left + this.parentRect.width + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE,
      top: this.parentRect.top + this.parentRect.height / 2 - this.tipRect.height / 2
    }
      : dir === 'top'
      ? {
      left: this.parentRect.left + this.parentRect.width / 2 - this.tipRect.width / 2,
      top: this.parentRect.top - this.tipRect.height - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE
    }
      : {
      left: this.parentRect.left + this.parentRect.width / 2 - this.tipRect.width / 2,
      top: this.parentRect.top + this.parentRect.height + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE
    };
  }

  protected fitInParent(pos) {
    let newPosition = {left: pos.left, top: pos.top};


    newPosition.left = Math.max(newPosition.left, OsPopover.TOOLTIP_WINDOW_EDGE_SPACE);


    if (document.documentElement.clientWidth < newPosition.left + this.tipRect.width + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE) {
      newPosition.left = document.documentElement.clientWidth - this.tipRect.width - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE;
    }

    newPosition.top = Math.max(newPosition.top, OsPopover.TOOLTIP_WINDOW_EDGE_SPACE);

    if (document.documentElement.clientHeight < newPosition.top + this.tipRect.height + OsPopover.TOOLTIP_WINDOW_EDGE_SPACE) {
      newPosition.top = document.documentElement.clientHeight - this.tipRect.height - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE;
    }

    return newPosition;
  }

  private positionTooltip() {
    this.tipRect = this.$mdUtil.offsetRect(this.$element, this.parent);
    this.parentRect = this.$mdUtil.offsetRect(this.parent, this.tooltipParent);

    let newPosition = this.getPosition(this.osDirection);
    let offsetParent = this.$element.prop('offsetParent');

    if (this.osDirection) {
      newPosition = this.fitInParent(newPosition);
    } else if (offsetParent && newPosition.top > offsetParent.scrollHeight - this.tipRect.height - OsPopover.TOOLTIP_WINDOW_EDGE_SPACE) {
      newPosition = this.fitInParent(this.getPosition('top'));
    }

    this.updatePosition(newPosition);
  }

  isWide() {
    return this.type === 'wide';
  }

}

class PopupManager implements ng.IServiceProvider{

  private popups = {};

  $get() {

    return {
      popup: id => {
        return this.popups[id] || {};
      },
      register: (id, ctrl) => {
        this.popups[id] = ctrl;
      },
      deregister: id => {
        this.popups[id] = null;
        delete this.popups[id];
      }
    };
  }
  constructor() {}
}

angular
  .module('osElements')
  .directive('osPopoverBackground', function () {
    return {
      restrict: 'A',
      scope: {
        osPopoverBackground: '='
      },
      link: function (scope, element, attr) {
        scope.$watch('osPopoverBackground', function(image) {
          if (! image) { return; }

          element.css({
            'background-image': 'url(' + image +')',
            'background-size' : 'cover'
          });
        })
      }
    }
  })
  .provider("$osPopupManager", PopupManager)
  .factory('$osPopover', ['$osPopupManager', '$rootScope', '$compile',function($osPopupManager, $rootScope, $compile) {
    return {
      create: options => {
        let scope = $rootScope.$new();
        angular.extend(scope, options.scope);

        let comp = this.compilePopup(options, scope);

        angular.element(document.body).append(angular.element(comp));

        scope.$apply();

        let ctrl = this.getPopupByHandle(scope.$id);

        ctrl.setParent(options.parent);

        return scope.$id;
      },
      prepareTemplates: options => {
        return '<os-popover class="os-popover" os-direction="'+ (options.direction || 'top') +'"> \
          <os-popover-title>'+ (options.title || '') + '</os-popover-title> \
          <os-popover-subtitle>'+ (options.subtitle || '') + '</os-popover-subtitle> \
          <os-popover-description>'+ (options.description || '') + '</os-popover-description> \
          <os-popover-actions>'+ (options.actions || '') + '</os-popover-actions> \
          <os-popover-main-image>'+ (options.mainImage || '') + '</os-popover-main-image> \
          <os-popover-left-image>'+ (options.leftImage || '') + '</os-popover-left-image> \
          <os-popover-background-image>'+ (options.backgroundImage || '') + '</os-popover-background-image> \
          <os-popover-actions>'+ (options.actions || '') + '</os-popover-actions> \
          </os-popover>';
      },
      compilePopup: (options, scope) => {
        let templates = this.prepareTemplates(options);
        return $compile(templates)(scope);
      },
      getPopupByHandle: handle => {
        return $osPopupManager.popup(handle);
      },
      show: handle => {
        let elem = this.getPopupByHandle(handle);
        elem.toggleVisibility(true)
      },
      hide: handle => {
        let elem = this.getPopupByHandle(handle);
        elem.toggleVisibility(false)
      },
    }
  }])
  .directive('osPopover', ['$osPopupManager', function ($osPopupManager) {
    return {
      scope: {
        osDirection: '@?',
        width: '@?osWidth',
        height: '@?osHeight',
        autoshow: '=?osAutoshow',
        type: '@?osType',
        visible: '=?osVisible',
      },
      controller: OsPopover,
      controllerAs: 'osPopover',
      bindToController: true,
      transclude: true,
      template: require('./popup.jade'),
      link: function (scope, element, attr, ctrl:OsPopover) {
        // content
        ctrl.title = element.find('os-popover-title').text();
        ctrl.subTitle = element.find('os-popover-subtitle').text();
        ctrl.mainImage = element.find('os-popover-main-image').text();
        ctrl.leftImage = element.find('os-popover-left-image').text();
        ctrl.backgroundImage = element.find('os-popover-background-image').text();
        ctrl.description = element.find('os-popover-description').text();
        ctrl.actions = element.find('os-popover-actions').detach();

        // remove transclude content
        angular.element(element[0].getElementsByClassName('transclude-content')[0]).remove();

        // translude button without losing bindings
        angular.element(element[0].getElementsByClassName('os-popover-content')).append( ctrl.actions );

        // watchers
        scope.$watch('osPopover.visible', function (visible) {
          ctrl.toggleVisibility(visible);
        });

        scope.$on("$destroy", function() {
          $osPopupManager.deregister(scope.$parent.$id);
        });

        $osPopupManager.register(scope.$parent.$id, ctrl);
      }
    }
  }]);
