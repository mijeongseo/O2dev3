export const SET_SEARCH_LOCATION_INFO = 'searchAddress/SET_SEARCH_LOCATION_INFO' as const;

export const setSearchLocationInfo = (keyword: string, address: string)=> ({ type: SET_SEARCH_LOCATION_INFO, keyword, address });

type SearchAddressAction = ReturnType<typeof setSearchLocationInfo>;

export type SearchAddressState = {
  keyword: string;
  address: string;
};

const initialState: SearchAddressState = {
  keyword: '',
  address: ''
};

//리듀서 생성
export default function reducer(state: SearchAddressState = initialState, action: SearchAddressAction) {
  switch (action.type) {
    case SET_SEARCH_LOCATION_INFO:
      return {
        ...state,
        keyword: action.keyword,
        address: action.address,
      };
    default:
      return state;
  }
}
