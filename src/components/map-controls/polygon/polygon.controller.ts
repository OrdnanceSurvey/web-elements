/// <reference path="../../../../typings/main.d.ts" />

import * as ol from "openlayers";
import IDrawInteractionOptions = olx.interaction.IDrawInteractionOptions;
import IScope = angular.IScope;

export interface IPolygonTool {
  toggle() : void;
  isActive() : boolean;
  featureLayer : any;
  enable(): void;
  deactivate(): void;
}

export class PolygonToolController implements IPolygonTool {
  public static $inject = ['$scope', '$timeout', 'olData'];

  public featureLayer;

  private $scope;
  private $timeout;
  private map:ol.Map;
  private features:ol.Collection<ol.Feature>;
  private featureSource:ol.source.Vector;
  private featureOverlay:ol.layer.Vector;
  private transparentStyle:ol.style.Style;
  private interaction: ol.interaction.Draw;

  constructor($scope: IScope, $timeout: ng.ITimeoutService, olData: any) {
    this.$scope = $scope;
    this.$timeout = $timeout;

    this.transparentStyle = new ol.style.Style({
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

    // create temporary vector overlay layer for the interaction.Draw to draw on
    // this layer will be transparent, because actual coordinates will be duplicated across onto this.featureLayer
    this.features = new ol.Collection<ol.Feature>();
    this.featureSource = new ol.source.Vector({features: this.features});
    this.featureOverlay = new ol.layer.Vector({
      source: this.featureSource,
      style: this.transparentStyle,
      updateWhileAnimating: true,
      updateWhileInteracting: true
    });

    // keep a reference to the map
    olData.getMap().then(map => {
      this.map = map;
    });
  }

  toggle() {
    if (this.interaction && this.interaction.getActive()) {
      this.deactivate();
    } else {
      this.enable();
    }
  }

  enable() {
    this.featureOverlay.setMap(this.map);

    var draw = new ol.interaction.Draw(<IDrawInteractionOptions>{
      features: this.features,
      type: 'Polygon',
      style: this.transparentStyle
    });


    draw.on('drawend', () => {
      // deactivate in a timeout to avoid a zoom-in because of double click
      this.$timeout(() => {
        this.deactivate();
      });

      this.$scope.$apply(() => {
        // when drawing ends, hide the 'editing' points on each vertex
        this.featureLayer.style.image.circle.fill.color = 'rgba(0,0,0,0)';
        this.featureLayer.style.image.circle.stroke.color = 'rgba(0,0,0,0)';
      });
    });

    draw.on('drawstart', (drawEvent: ol.interaction.DrawEvent) => {

      drawEvent.feature.getGeometry().on('change', (changeEvent: any) => {

        this.$scope.$apply(() => {
          this.featureLayer.style.image.circle.fill.color = '#D40058';
          this.featureLayer.style.image.circle.stroke.color = '#FFFFFF';
        });

        // this event fires in OpenLayers, so tell Angular about it
        var coords = changeEvent.target.getCoordinates();
        this.$scope.$apply(() => {
          // add fake geometry to the real feature object.
          // first the polygon, then the MultiPoint fake 'editing' points for each vertex
          //noinspection TypeScriptUnresolvedVariable
          this.featureLayer.source.geojson.object.features[0].geometry.geometries[0].coordinates = coords;
          //noinspection TypeScriptUnresolvedVariable
          this.featureLayer.source.geojson.object.features[0].geometry.geometries[1].coordinates = coords[0];
        });


      });

    });

    this.interaction = draw;
    this.map.addInteraction(draw);

  }

  private removeColour(layer: any): void {
    layer = layer || {};
    layer.style = layer.style || {};
    layer.style.image = layer.style.image || {};
    layer.style.image.circle.fill = layer.style.image.circle.fill || {};
    layer.style.image.circle.stroke = layer.style.image.circle.stroke || {};
    layer.style.image.circle.fill.color = 'rgba(0,0,0,0)';
    layer.style.image.circle.stroke.color = 'rgba(0,0,0,0)';
  }

  private addColour(layer: any): void {
    layer = layer || {};
    layer.style = layer.style || {};
    layer.style.image = layer.style.image || {};
    layer.style.image.circle.fill = layer.style.image.circle.fill || {};
    layer.style.image.circle.stroke = layer.style.image.circle.stroke || {};
    layer.style.image.circle.fill.color = '#D40058';
    layer.style.image.circle.stroke.color = '#FFFFFF';
  }

  // deactivate
  deactivate() {
    this.map.removeInteraction(this.interaction);
    this.interaction = null;
    this.featureOverlay.setMap(null);
  }

  // return true if the current tool is active
  isActive() {
    return this.interaction && this.interaction.getActive();
  }

  // get an openlayers layer by name
  private getOpenlayersLayer(map:ol.Map, layerName:string): ol.layer.Base {
    return map.getLayers().getArray().filter(function (layer:ol.layer.Base) {
      let layerProps = <any>layer.getProperties();
      return layerProps.name === layerName;
    })[0];
  }


}
