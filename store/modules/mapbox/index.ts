import { ViewStateProps } from '@deck.gl/core/lib/deck';
import { FlyToInterpolator } from 'deck.gl';

export const SET_VIEWPORT = 'mapbox/SET_VIEWPORT' as const;
export const SET_MAPSTYLE = 'mapbox/SET_MAPSTYLE' as const;
export const SET_ZOOMLEVEL = 'mapbox/SET_ZOOMLEVEL' as const;

export const setViewport = (latitude: number, longitude: number, zoom: number) => ({ type: SET_VIEWPORT, latitude, longitude, zoom });
export const setMapStyle = (mapStyle: string) => ({ type: SET_MAPSTYLE, mapStyle });
export const setZoomLevel = (zoom: number) => ({ type: SET_ZOOMLEVEL, zoom });

type MapboxAction = ReturnType<typeof setViewport> | ReturnType<typeof setMapStyle> | ReturnType<typeof setZoomLevel>;

export type MapboxState = {
  mapStyle: string;
  viewport: ViewStateProps;
};

const initialState: MapboxState = {
  mapStyle: 'light',
  viewport: {
    latitude: 38.904192699418026,
    longitude: -169.47881837543184,
    minZoom: 2,
    maxZoom: 17,
    zoom: 2,
    bearing: 0,
    pitch: 0,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator(),
  },
};

//리듀서 생성
export default function reducer(state: MapboxState = initialState, action: MapboxAction) {
  switch (action.type) {
    case SET_VIEWPORT:
      return {
        ...state,
        viewport: {
          ...state.viewport,
          latitude: action.latitude,
          longitude: action.longitude,
          zoom: action.zoom,
        },
      };
    case SET_MAPSTYLE:
      return {
        ...state,
        mapStyle: action.mapStyle,
      };
    case SET_ZOOMLEVEL:
      return {
        ...state,
        viewport: {
          ...state.viewport,
          zoom: action.zoom,
        },
      };
    default:
      return state;
  }
}
