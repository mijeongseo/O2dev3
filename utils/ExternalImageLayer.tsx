import { BitmapLayer } from '@deck.gl/layers';

type ExternalImageLayerProps = {
  name: string;
  url: string;
  bounds: [number, number, number, number];
  opacity: number
}

export default async function ExternalImageLayer ({ name, url, bounds, opacity }: ExternalImageLayerProps) {
  return new BitmapLayer({
    id: `externalImageLayer_${name}`, 
    bounds: bounds,
    image: url,
    opacity: opacity
  });
}