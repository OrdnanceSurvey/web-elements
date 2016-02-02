/// <reference path="../../../typings/main.d.ts" />

import * as ol from "openlayers";

export class OsTabs {
  static $inject = ['$element', '$transclude'];

  $transclude;
  mdDynamicHeight;

  constructor($element:ng.IRootElementService, $transclude:ng.ITranscludeFunction) {
    this.$transclude = $transclude;

    this.mdDynamicHeight = true;
  }
}

export interface IOsControl {
  toggle;
  isActive;
  properties;
  type;
  uxlayer;
}

export class OsControl implements IOsControl {
  static $inject = ['$element', '$timeout', '$scope', 'olData'];

  toggle;
  isActive;
  properties;
  type;
  uxlayer;

  private map: ol.Map;

  constructor($element:ng.IRootElementService, $timeout: ng.ITimeoutService, $scope, olData) {
    let noStyle = new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(0,0,0, 0.0)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0,0,0, 0.0)',
        width: 3
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: 'rgba(0,0,0, 0.0)'
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(0,0,0, 0.0)',
          width: 3
        })
      })
    });

    // temporary, invisible Overlay layer
    var features = new ol.Collection();
    var featureSource = new ol.source.Vector({features: features});
    var featureOverlay = new ol.layer.Vector({
      source: featureSource,
      style: noStyle
    });

    olData.getMap().then(theMap => {
      this.map = theMap;
      console.log('set map to ', theMap);
    });
    //olData.getMap().then(function (theMap) {
    //  map = theMap;
    //  window.map = theMap;
    //});

    function getPolygonSource(map: ol.Map) {
      return map.getLayers().getArray().filter(function (layer: ol.layer.Layer) {
        let layerProps = layer.getProperties();
        return layerProps.name === vm.uxlayer.name;
      })[0];
    }

    var controlTypes = {
      polygon: {
        enable: function () {
          var ctrl = this;
          console.log('enable polygon');

          featureOverlay.setMap(map);

          var draw = new ol.interaction.Draw({
            features: features,
            type: 'Polygon',
            style: noStyle
          });


          draw.on('drawend', function () {
            // disable in a timeout to avoid a zoom-in because of double click
            $timeout(function () {
              ctrl.disable();
            });

            $scope.$apply(function () {
              // when drawing ends, hide the 'editing' points on each vertex
              vm.uxlayer.style.image.circle.fill.color = 'rgba(0,0,0,0)';
              vm.uxlayer.style.image.circle.stroke.color = 'rgba(0,0,0,0)';
            });
          });

          draw.on('drawstart', function (drawEvent) {

            drawEvent.feature.getGeometry().on('change', function (geometry) {

              $scope.$apply(function () {
                vm.uxlayer.style.image.circle.fill.color = '#D40058';
                vm.uxlayer.style.image.circle.stroke.color = '#FFFFFF';
              });

              // this event fires in OpenLayers, so tell Angular about it
              var coords = geometry.currentTarget.getCoordinates();
              $scope.$apply(function () {
                // add fake geometry to the real feature object.
                // first the polygon, then the MultiPoint fake 'editing' points for each vertex
                vm.uxlayer.source.geojson.object.features[0].geometry.geometries[0].coordinates = coords;
                vm.uxlayer.source.geojson.object.features[0].geometry.geometries[1].coordinates = coords[0];
                console.log('added ' + coords[0].length + ' coords');
              });


            });

          });

          map.addInteraction(draw);
          controlTypes.polygon.interaction = draw;
        },
        disable: function () {
          console.log('disable polygon');
          map.removeInteraction(controlTypes.polygon.interaction);
          delete controlTypes.polygon.interaction;
          featureOverlay.setMap(null);
        }
      }
    };


    function toggle() {
      console.log('doing toggle', controlTypes[vm.type]);

      var control = controlTypes[vm.type];

      if (control.interaction && control.interaction.getActive()) {
        control.disable();
      } else {
        control.enable();
      }
    }

    function isActive() {
      if (control.interaction && control.interaction.getActive()) {
        return true;
      } else {
        return false;
      }
    }
  }
}

angular
  .module('osElements')
  .directive('osControl', function (olData) {
    this.$inject = ['olData'];

      return {
        restrict: 'E',
        scope: {},
        require: '^openlayers',
        controllerAs: 'ctrl',
        template: '<os-button variation="outline" colour="primary" ng-click="ctrl.toggle()">{{ctrl.type}}</os-button>',
        bindToController: {
          properties: '=osControlProperties',
          type: '@osControlType',
          uxlayer: '=uxlayer'
        },
        controller: OsControl,
        link: function (scope, iElement: ng.IRootElementService, attrs: ng.IAttributes, openlayersCtrl) {

          olData.getMap().then(function (map) {

            function MyControl() {
              ol.control.Control.call(this, {
                element: iElement[0]
              });
            }

            ol.inherits(MyControl, ol.control.Control);
            map.addControl(new MyControl());


          });

        }
      }
    }
  );
