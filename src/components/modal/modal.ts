/// <reference path="../../../typings/main.d.ts" />

export { OsModal } from './services/osModal';
import { OsModal } from './services/osModal';

angular
  .module('osElements')

  .provider('$OsModal', OsModal);
