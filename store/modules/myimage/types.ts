import { locationJsonInfo } from "../searchResult/types"

export type MyImageProps = {
  idx: number,
  name: string,
  cloud_ratio: number, 
  image_timestamp: number,
  bounds: [number, number, number, number],
  thumbnail: string | null,
  satellite: string,
  services: string[],
  kst_date: string,
  image_path?: string,
  tiles?: string[],
  image_date?: number[],
  center?: number[],
  tilejson?: string, 
  maxzoom?: number,
  minzoom?: number, 
  geocode?: string[],
  location?: string[],
  // done?: boolean, 
  object_detection?: [string, number]
}

export type MyimageInfo = {
  email: string;
  image_idx: number;
  service: string[];
  select_service: string[];
  select: boolean;
  sr: number;
  image_info: MyImageProps;
  sr_info?: MyImageProps;
  newType?: string;
}

export type MyimageState = {
  count: number;
  sr_count: number;
  sr_process_count: number;
  imageList: MyimageInfo[] | null;
  locationJsonList: locationJsonInfo[] | null;
  selectMyImage: [number, string, boolean, string] | null;
  // idx, service, selected, satellite
  imageOpacity: [number, string, number] | null;
  // idx, service, opacity
}
