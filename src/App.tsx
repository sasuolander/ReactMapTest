import React, {useState} from 'react';
import './App.scss';
import {Controls, FullScreenControl} from "./control";
import {osm, vector} from "./source";
import {Layers, TileLayer, VectorLayer} from "./layers";
import {GeoJSON} from "ol/format";
import {Fill, Stroke, Style} from "ol/style";
import CircleStyle from "ol/style/Circle";
import {get} from "ol/proj";
import {Geometry} from "ol/geom";
import {Feature} from "ol";


interface stylelist{
  [name:string]:Style
}

let styles:stylelist = {
  "Point":new Style({
    image: new CircleStyle({
      radius: 10,
      fill:undefined,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Polygon':new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
  'MultiPolygon':new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  })
}


const geojsonObject2:Feature<Geometry>= new Feature<Geometry>(

)
const geojsonObject:Feature<Geometry> = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "kind": "county",
        "name": "Wyandotte",
        "state": "KS"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -94.8627,
                39.202
              ],
              [
                -94.901,
                39.202
              ],
              [
                -94.9065,
                38.9884
              ],
              [
                -94.8682,
                39.0596
              ],
              [
                -94.6053,
                39.0432
              ],
              [
                -94.6053,
                39.1144
              ],
              [
                -94.5998,
                39.1582
              ],
              [
                -94.7422,
                39.1691
              ],
              [
                -94.7751,
                39.202
              ],
              [
                -94.8627,
                39.202
              ]
            ]
          ]
        ]
      }
    }
  ]
};


interface FeatureCollection {

}

const geojsonObject2:FeatureCollection=[]

/*  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "kind": "county",
        "name": "Johnson",
        "state": "KS"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -94.9065,
                38.9884
              ],
              [
                -95.0544,
                38.9829
              ],
              [
                -95.0544,
                38.7365
              ],
              [
                -94.9668,
                38.7365
              ],
              [
                -94.6108,
                38.7365
              ],
              [
                -94.6108,
                38.846
              ],
              [
                -94.6053,
                39.0432
              ],
              [
                -94.8682,
                39.0596
              ],
              [
                -94.9065,
                38.9884
              ]
            ]
          ]
        ]
      }
    }
  ]
};*/

const  App=()=> {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);


  return (
      <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer
                source={osm()}
                zIndex={0}
            />
            {showLayer1 && (
                <VectorLayer
                    source={new GeoJSON()
                        .readFeatures(geojsonObject2,
                            {featureProjection: get('EPSG:3857')})}
                    style={styles.MultiPolygon}
                />
            )}
            {showLayer2 && (
                <VectorLayer
                    source={new GeoJSON()
                     .readFeatures(geojsonObject2,
                     {featureProjection: get('EPSG:3857')})}
                    style={styles.MultiPolygon}
                />
            )}
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
        <div>
          <input
              type="checkbox"
              checked={showLayer1}
              onChange={event => setShowLayer1(event.target.checked)}
          /> Johnson County
        </div>
        <div>
          <input
              type="checkbox"
              checked={showLayer2}
              onChange={event => setShowLayer2(event.target.checked)}
          /> Wyandotte County</div>
      </div>
  );
}

export default App;
