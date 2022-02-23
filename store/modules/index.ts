import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import myimage from './myimage';
import mapbox from './mapbox';
import searchResult from './searchResult';
import searchInfo from './searchInfo';
import searchAddress from './searchAddress';

export type State = {
  tick: string;
}

const rootReducer = combineReducers({
  index: (state: State = {tick: 'init'}, action: AnyAction) => {
    switch (action.type) {
      case HYDRATE:
        return {
          ...state,
          ...action.payload
        };
      case 'TICK':
        return {
          ...state,
          tick: action.payload
        };
      default:
        return state;
    }
  },
  myimage,
  mapbox,
  searchResult,
  searchInfo,
  searchAddress, 
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
