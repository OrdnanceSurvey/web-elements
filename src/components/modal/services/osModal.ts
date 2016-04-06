/// <reference path="../../../../typings/main.d.ts" />

import IDialogService = angular.material.IDialogService;
import IMedia = angular.material.IMedia;
import IDialogOptions = angular.material.IDialogOptions;
import IAlertDialog = angular.material.IAlertDialog;
import IConfirmDialog = angular.material.IConfirmDialog;

export interface IModalOptions {
  title: string,
  textContent: string,
  template: string,
  templateUrl?: string,
  ok: string,
  cancel: string,
  fullscreen: boolean,
  controller?: any
}


export interface IOptions extends IModalOptions {}

export interface IOsModalService {
  alert: any,
  confirm: any,
  html: any,
  show: any
}

export class OsModalService implements IOsModalService {

  constructor(private $mdDialog:IDialogService, private $mdMedia:IMedia) {}

  private getDefaultOptions(options:IOptions):IModalOptions {

    options.title = options.hasOwnProperty('title') ? options.title : '';
    options.textContent = options.hasOwnProperty('textContent') ? options.textContent : '';
    options.template = options.hasOwnProperty('template') ? options.template : require('html!../templates/default.html');
    options.ok = options.hasOwnProperty('ok') ? options.ok : 'OK';
    options.cancel = options.hasOwnProperty('cancel') ? options.cancel : 'Cancel';
    options.fullscreen = options.hasOwnProperty('fullscreen') ? options.fullscreen : true;

    return options;
  }

  private prepareModalOptions(dialog: IDialogOptions|IAlertDialog|IConfirmDialog, options:IOptions): void {
    angular.forEach(options, function(value, key) {
      if(angular.isFunction(dialog[key])) {
        dialog[key](value);
      }
    });
  }

  alert(options:IOptions, display:boolean = true):angular.IPromise<any>|IAlertDialog {
    let params = this.getDefaultOptions(options);

    let modal = this.$mdDialog.alert();

    this.prepareModalOptions(modal, params);

    return display ? this.$mdDialog.show(modal) : modal;
  }

  confirm(options:IOptions, display:boolean = true):angular.IPromise<any>|IConfirmDialog {
    let params = this.getDefaultOptions(options);

    let modal = this.$mdDialog.confirm();

    this.prepareModalOptions(modal, params);

    return display ? this.$mdDialog.show(modal) : modal;
  }

  html(options:IOptions):angular.IPromise<any> {
    let params = this.getDefaultOptions(options);

    // bind controller
    if (options.controller) {
      params.controller = options.controller;
    }

    // bind template
    if (options.templateUrl) {
      params.templateUrl = options.templateUrl;
    } else if (options.template) {
      params.template = options.template;
    }

    return this.$mdDialog.show(params);
  }

  show(dialog:IDialogOptions|IAlertDialog|IConfirmDialog) {
    return this.$mdDialog.show(dialog);
  }

}

export class OsModal {

  $get = ['$mdDialog', '$mdMedia', ($mdDialog:IDialogService, $mdMedia:IMedia) => {

    return new OsModalService($mdDialog, $mdMedia);

  }];

}
