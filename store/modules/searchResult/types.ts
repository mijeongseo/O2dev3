export type ImageListInfo = {
  result: boolean;
  count: number, 
  service: {[key: string]: number}, 
  images: ImageInfo[],
  locationJsonList: locationJsonInfo[], 
  selectImage: [boolean, number, string, boolean, string] | null
  // internal, idx, service, selected, satellite
}

export type ImageInfo = {
  idx: number,
  name: string,
  cloud_ratio: number, 
  image_timestamp: number,
  bounds: [number, number, number, number],
  thumbnail: string | null,
  satellite: string,
  services: string[],
  service: string[], 
  select: boolean,
  kst_date: string,
  internal: boolean,
  image_path?: string,
  tiles?: string[],
  image_date?: number[],
  center?: number[],
  tilejson?: string, 
  maxzoom?: number,
  minzoom?: number, 
  geocode?: string[],
  location?: string[],
  done?: boolean, 
  object_detection?: [string, number]
}

export type locationJsonInfo = {
  idx: number,
  bounds: [number, number, number, number],
  internal: boolean, 
}