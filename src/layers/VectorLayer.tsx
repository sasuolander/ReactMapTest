import { useContext, useEffect } from "react";
import MapContext from "../map/MapContext";
import OLVectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { StyleLike } from "ol/style/Style";
import Geometry from "ol/geom/Geometry";

const VectorLayer = ( source:VectorSource<Geometry>, style:StyleLike, zIndex = 0 ) => {
	const { map } = useContext(MapContext);

	useEffect(() => {
		if (!map) return;

		let vectorLayer = new OLVectorLayer({
			source,
			style
		});

		map.addLayer(vectorLayer);
		vectorLayer.setZIndex(zIndex);

		return () => {
			if (map) {
				map.removeLayer(vectorLayer);
			}
		};
	}, [map]);

	return null;
};

export default VectorLayer;