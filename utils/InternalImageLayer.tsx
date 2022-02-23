import { TileLayer } from "@deck.gl/geo-layers";
import { load } from "@loaders.gl/core";
import { BitmapLayer } from "deck.gl";

type OverlapProps = {
  right1: number[],
  right2: number[],
  left1: number[],
  left2: number[]
}

type CustomLayerProps = {
  id: number,
  service: string, 
  bounds: [ number, number, number, number ],
  url: string,
  opacity: number,
  layer: string
}

const overlap = ({ right1, right2, left1, left2 }: OverlapProps) => {
  // Check if tile and image overlap
  if (left1[0] > right2[0] || left2[0] > right1[0])
      return false;
  
  if (left1[1] < right2[1] || left2[1] < right1[1])
      return false;
  
  return true; //else in all condition
};

export default async function InternalImageLayer ({ id, service, bounds, url, opacity, layer }: CustomLayerProps) {
  return new TileLayer ({
    getTileData: tile => {
      const tileWithinBounds = overlap({
        right1: [ bounds[2], bounds[1] ],
        right2: [ tile.bbox.east, tile.bbox.south ], 
        left1: [ bounds[0], bounds[3] ],
        left2: [ tile.bbox.west, tile.bbox.north ]
      });

      if (tileWithinBounds) {
        return load(url.replace('{z}/{x}/{y}', `${tile.z}/${tile.x}/${tile.y}`));
      }
      else {
        return null;
      }      
    },
    id: layer === 'finder' ? `internalImageLayer_${id.toString()}_${service}` : `myPageImageLayer_${id.toString()}_${service}`,
    // maxRequests: 20,
    pickable: true,
    // onClick: (info, event) => console.log('Clicked:', info, event), 
    autoHighlight: false,
    highlightColor: [60, 60, 60, 40],
    // minZoom: 0,
    // maxZoom: 19,
    tileSize: 512,
    extent: bounds,
    visible: true, 
    // maxCacheSize: 30,
    opacity: opacity, 
    refinementStrategy: 'best-available',
    // onHover: () => {
    //   // console.log('test')
    //   console.log(id)
    // },
    // onClick: () => {
    //   console.log('test')
    //   console.log(id)
    // },
    renderSubLayers: (props) => {
      const {
          bbox: { west, south, east, north },
      } = props.tile;

      return [
          new BitmapLayer(props, {
              data: null,
              image: props.data,
              bounds: [west, south, east, north],
              // opacity: opacity,
          }),        
      ];
    }
  });
}