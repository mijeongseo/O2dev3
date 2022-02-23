export const SET_LOCATION_SEARCH_MODE = 'searchInfo/SET_LOCATION_SEARCH_MODE' as const;
export const SET_LOCATION_INFO = 'searchInfo/SET_LOCATION_INFO' as const;

export const setLocationSearchMode = (mode: boolean)=> ({ type: SET_LOCATION_SEARCH_MODE, mode });
export const setLocationInfo = (aoi: [number, number][])=> ({ type: SET_LOCATION_INFO, aoi });

type SearchInfoAction = ReturnType<typeof setLocationSearchMode> | ReturnType<typeof setLocationInfo>;

export type SearchInfoState = {
  mode: boolean;
  aoi: [number, number][] | null
};

const initialState: SearchInfoState = {
  mode: false,
  aoi: null
};

//리듀서 생성
export default function reducer(state: SearchInfoState = initialState, action: SearchInfoAction) {
  switch (action.type) {
    case SET_LOCATION_SEARCH_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    case SET_LOCATION_INFO:
      return {
        ...state,
        aoi: action.aoi,
      };
    default:
      return state;
  }
}
