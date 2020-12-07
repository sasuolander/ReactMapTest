import { Vector as VectorSource } from 'ol/source';
import {FeatureLike} from "ol/Feature";

const vector= (features: FeatureLike[] )=> {return new VectorSource(features[0].getGeometry());}
export default vector;
