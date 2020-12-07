import React, { useRef, useState, useEffect, MutableRefObject } from "react"
import "./Map.scss";
import MapContext from "./MapContext";
import Map from 'ol/map'
import View from 'ol/View';
import Coordinate from 'ol/coordinate'
import { MapOptions } from "ol/PluggableMap";

const MyMap = ( children:any,zoom:number,center:Coordinate.Coordinate) => {
     // @ts-ignore
  const mapRef:MutableRefObject<HTMLDivElement> = useRef();
  const [map, setMap] = useState(null);
  // on component mount
  useEffect(() => {
    let options:MapOptions = {
      view: new View({zoom,center}),
      layers: [],
      controls: [],
      overlays: []
    };
    let mapObject:Map = new Map(options);
    mapObject.setTarget(mapRef.current);
    // @ts-ignore
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, []);
  // zoom change handler
  useEffect(() => {
    if (!map) return;
    // @ts-ignore
    map.getView().setZoom(zoom);
  }, [zoom]);
  // center change handler
  useEffect(() => {
    if (!map) return;
    // @ts-ignore
    map.getView().setCenter(center)
  }, [center])
  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>
  )
}
export default MyMap;