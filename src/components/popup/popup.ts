/// <reference path="../../../typings/main.d.ts" />

export class OsPopover {
  static $inject = ['$element', '$transclude', '$mdUtil'];

  private parent;

  osDirection:string;

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

  constructor(private $element:ng.IRootElementService, private $transclude:ng.ITranscludeFunction, private $mdUtil:any) {
    this.tooltipParent = angular.element(document.body);

    console.log($element, this.width);

    this.postLink();

    this.tooltipParent.append($element);
  }

  private postLink() {
    this.parent = this.$mdUtil.getParentWithPointerEvents(this.$element);

    this.parent.on('focus mouseenter touchstart', this.enterHandler.bind(this));

  }

  private enterHandler() {
    this.show();
    this.positionTooltip();
  }

  private show() {
    this.$element.css('display', 'block');
  }

  private hide() {
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
  .directive('osPopover', function () {
    return {
      scope: {
        osDirection: '@?',
        width: '@?osWidth',
        height: '@?osHeight',
        type: '@?osType',
        osVisible: '=?',
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
      }
    }
  });
