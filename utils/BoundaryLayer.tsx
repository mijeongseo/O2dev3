import React from 'react';

import { GeoJsonLayer } from '@deck.gl/layers';
import { locationJsonInfo } from 'store/modules/searchResult/types';
import { COLOR } from 'styles/styles';

const createGeoJson = (data: locationJsonInfo[]) => {
  return {
    type: 'FeatureCollection',
    features:
      data &&
      data.map((info) => {
        return createFeature(info);
      }),
  };
};

const editLonLat = (locInfo: locationJsonInfo, isPositive: boolean) => {
  
  let temp = JSON.parse(JSON.stringify(locInfo));
  if (isPositive) {
    temp.bounds[0] += 360;
    temp.bounds[2] += 360;
  }
  else {
    temp.bounds[0] -= 360;
    temp.bounds[2] -= 360;
  }

  return temp;
}

const editLonValue = (data: locationJsonInfo[]) => {
  
  const result: locationJsonInfo[] = [];

  data.map(locInfo => {
    const plusLoc = editLonLat(locInfo, true);
    const minusLoc = editLonLat(locInfo, false);

    result.push(locInfo);
    result.push(plusLoc);
    result.push(minusLoc);
  })

  return result;
}

const createFeature = (locInfo: locationJsonInfo) => {
  const coordinates = [
    [
      [locInfo.bounds[0], locInfo.bounds[1]],
      [locInfo.bounds[0], locInfo.bounds[3]],
      [locInfo.bounds[2], locInfo.bounds[3]],
      [locInfo.bounds[2], locInfo.bounds[1]],
      [locInfo.bounds[0], locInfo.bounds[1]],
    ],
  ];

  return {
    type: 'Feature',
    geometry: {
      type: 'Polygon', // LineString
      coordinates: coordinates,
    },
    properties: {
      name: locInfo.idx.toString(),
      selected: false
    },
  };
};

const rgbaToArray = (color: string, alpha?: number) => {
  const rgba = color.replace(/^rgba?\(|\s+|\)$/g, '').split(',');
  const result: [number, number, number, (number | undefined)?] = [0, 0, 0, 0];

  if (rgba.length == 4) {
    result[0] = parseInt(rgba[0]);
    result[1] = parseInt(rgba[1]);
    result[2] = parseInt(rgba[2]);
    if (alpha) {
      result[3] = alpha * 255;
    }
    else {
      result[3] = parseInt(rgba[3]) * 255;
    }
  } 
  else if (rgba.length == 3) {
    result[0] = parseInt(rgba[0]);
    result[1] = parseInt(rgba[1]);
    result[2] = parseInt(rgba[2]);
    if (alpha) {
      result[3] = alpha * 255;
    }
    else {
      result[3] = 255;
    }
  }

  return result;
}

type BoundaryLayerProps = {
  data: locationJsonInfo[],
  layer: string
}

export default function BoundaryLayer ({ data, layer }: BoundaryLayerProps) {

  return new GeoJsonLayer({
    id: `MypageBoundaryLayer_${data[0].idx}`,
    data: createGeoJson(editLonValue(data)),
    getLineColor: rgbaToArray(COLOR.sky),
    // getLineColor: (d: any) => (test(d)) ? [1, 1, 1] :  [100, 105, 155],
    getLineWidth: 1,
    getFillColor: rgbaToArray(COLOR.sky, 0.2),
    lineWidthMinPixels: 1,
    visible: false,
    pickable: true,
    // onHover: (info, event) => {
    //   console.log(info);
    // },
    // updateTriggers: {
    //   getLineColor: [
    //     console.log('adsfasd')
    //   ]
    // },
    onClick: (info, event) => {
      // console.log(data)
      // console.log(info);
      // console.log(info.layer);
      // console.log(info.object.properties.selected)
    }
  });
}

function test (d: any) {
  console.log(d)
  return true;
}