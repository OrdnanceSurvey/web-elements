import * as angular from 'angular';
import 'angular-material';
import 'rx-angular';

function OsElementsConfig($mdThemingProvider, $mdIconProvider) {

  $mdThemingProvider.definePalette('midnightblue', {
    '50': '#e4e2f3',
    '100': '#b1acdc',
    '200': '#8c85cc',
    '300': '#5d52b7',
    '400': '#4f45a6',
    '500': '#453c90',
    '600': '#3b337a',
    '700': '#302a65',
    '800': '#26214f',
    '900': '#1c183a',
    'A100': '#e4e2f3',
    'A200': '#b1acdc',
    'A400': '#4f45a6',
    'A700': '#302a65',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100 A200'
  });

  $mdThemingProvider.definePalette('rubinered', {
    '50': '#ffdeec',
    '100': '#ff92bf',
    '200': '#ff5a9e',
    '300': '#ff1274',
    '400': '#f30065',
    '500': '#d40058',
    '600': '#b5004b',
    '700': '#97003f',
    '800': '#780032',
    '900': '#5a0025',
    'A100': '#ffdeec',
    'A200': '#ff92bf',
    'A400': '#f30065',
    'A700': '#97003f',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100 A200'
  });

  $mdThemingProvider.definePalette('solutions', {
    '50': '#d8f5ff',
    '100': '#8ce1ff',
    '200': '#54d3ff',
    '300': '#0cc1ff',
    '400': '#00b0ed',
    '500': '#0099ce',
    '600': '#0082af',
    '700': '#006c91',
    '800': '#005572',
    '900': '#003e54',
    'A100': '#d8f5ff',
    'A200': '#8ce1ff',
    'A400': '#00b0ed',
    'A700': '#006c91',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
  });

  $mdThemingProvider.definePalette('creativegreen', {
    '50': '#ffffff',
    '100': '#f3f7e5',
    '200': '#deeab9',
    '300': '#c4da82',
    '400': '#b9d36b',
    '500': '#aecc53',
    '600': '#a3c53b',
    '700': '#90ae34',
    '800': '#7c972d',
    '900': '#697f26',
    'A100': '#ffffff',
    'A200': '#f3f7e5',
    'A400': '#b9d36b',
    'A700': '#90ae34',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 500 600 700 800 A100 A200 A400 A700'
  });

  $mdThemingProvider.definePalette('mapping', {
    '50': '#ffffff',
    '100': '#fad7c8',
    '200': '#f5b294',
    '300': '#ef8353',
    '400': '#ed6f37',
    '500': '#ea5b1b',
    '600': '#d34f13',
    '700': '#b74411',
    '800': '#9b3a0e',
    '900': '#7f2f0c',
    'A100': '#ffffff',
    'A200': '#fad7c8',
    'A400': '#ed6f37',
    'A700': '#b74411',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 300 400 A100 A200 A400'
  });

  $mdThemingProvider.definePalette('data', {
    '50': '#e6bae1',
    '100': '#d282c8',
    '200': '#c359b6',
    '300': '#9c388f',
    '400': '#85307b',
    '500': '#6f2866',
    '600': '#582051',
    '700': '#42183d',
    '800': '#2b1028',
    '900': '#150813',
    'A100': '#e6bae1',
    'A200': '#d282c8',
    'A400': '#85307b',
    'A700': '#42183d',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100 A200'
  });

  $mdThemingProvider.definePalette('charcoal', {
    '50': '#c1c1c1',
    '100': '#9a9a9a',
    '200': '#7e7e7e',
    '300': '#5b5b5b',
    '400': '#4b4b4b',
    '500': '#3c3c3c',
    '600': '#2d2d2d',
    '700': '#1d1d1d',
    '800': '#0e0e0e',
    '900': '#000000',
    'A100': '#c1c1c1',
    'A200': '#9a9a9a',
    'A400': '#4b4b4b',
    'A700': '#1d1d1d',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 A100 A200'
  });

  $mdThemingProvider.theme('os').primaryPalette('midnightblue').accentPalette('rubinered');
  $mdThemingProvider.theme('osmidnightblue').primaryPalette('midnightblue');
  $mdThemingProvider.theme('osrubinered').primaryPalette('rubinered');
  $mdThemingProvider.theme('ossolutions').primaryPalette('solutions');
  $mdThemingProvider.theme('oscreativegreen').primaryPalette('creativegreen');
  $mdThemingProvider.theme('osmapping').primaryPalette('mapping');
  $mdThemingProvider.theme('osdata').primaryPalette('data');
  $mdThemingProvider.theme('oscharcoal').primaryPalette('charcoal');

  // icons
  $mdIconProvider.defaultFontSet('material-icons');
}

angular.module('osElements', ['ngMaterial', 'rx']).config(['$mdThemingProvider', '$mdIconProvider', OsElementsConfig]);

export * from './components/button/button.component';
export {OsPopover} from './components/popup/popup';
export {OsToolbar} from './components/toolbar/toolbar';
export {OsSlider} from './components/slider/slider';
export {OsHeader} from './components/header/header';
export * from './components/search/search.component';
export {OsZoombar} from './components/zoombar/zoombar';
