/// <reference path="../../../typings/main.d.ts" />

import * as ol from 'openlayers';

export interface IProjectionService {
  'EPSG:27700': ol.proj.Projection;
}


export class ProjectionService implements IProjectionService {

  'EPSG:27700';

  constructor(private ol:any, private proj4:any) {
    this['EPSG:27700'] = this.createEPSG27700();
  }


  private createEPSG27700() {
    this.proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.999601 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894 +datum=OSGB36 +units=m +no_defs");

    function returnSameCoords(coord: ol.Coordinate): ol.Coordinate {
      return <ol.Coordinate>[coord[0], coord[1]]; // identical
    }

    this.ol.proj.addCoordinateTransforms(<ol.proj.ProjectionLike>'EPSG:27700', <ol.proj.ProjectionLike>'EPSG:27700', returnSameCoords, returnSameCoords);

    return new ol.proj.Projection(<olx.Projection>{
      code: 'EPSG:27700',
      extent: [-238375.0, 0, 700000, 1300000],
      units: 'm'
    });
  }

}

export class ProjectionServiceProvider {

  $get = ['ol', 'proj4', (ol:any, proj4:any) => {
    return new ProjectionService(ol, proj4);
  }];

}
