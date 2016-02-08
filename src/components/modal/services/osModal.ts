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


export interface IOptions extends IModalOptions {
}


export class OsModalService {

  constructor(private $mdDialog:IDialogService, private $mdMedia:IMedia) {
  }

  private getDefaultOptions(options:IOptions):IModalOptions {
    return {
      title: options.title || '',
      textContent: options.textContent || '',
      template: require('html!../templates/default.html'),
      ok: options.ok || 'OK',
      cancel: options.cancel || 'Cancel',
      fullscreen: this.isFullScreen()
    }
  }

  alert(options:IOptions, display:boolean = true):angular.IPromise<any>|IAlertDialog {
    let params = this.getDefaultOptions(options);

    let modal = this.$mdDialog.alert(params);

    return display ? this.$mdDialog.show(modal) : modal;
  }

  confirm(options:IOptions, display:boolean = true):angular.IPromise<any>|IConfirmDialog {
    let params = this.getDefaultOptions(options);

    let modal = this.$mdDialog.confirm(params);

    return display ? this.$mdDialog.show(modal) : modal;
  }

  html(options:IOptions, display:boolean = true):angular.IPromise<any> {
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

  isFullScreen():boolean {
    // according to ux all modal should be full screen
    return true; //this.$mdMedia('sm') || this.$mdMedia('xs')
  }

}

export class OsModal {

  $get = ['$mdDialog', '$mdMedia', ($mdDialog:IDialogService, $mdMedia:IMedia) => {

    return new OsModalService($mdDialog, $mdMedia);

  }];

}
