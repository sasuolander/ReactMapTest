import * as olSource from "ol/source";
import {AttributionLike} from "ol/source/Source";

const xyz=( url:string, attributions:AttributionLike, maxZoom:number )=>
{return new olSource.XYZ({ url, attributions, maxZoom });}
export default xyz;
