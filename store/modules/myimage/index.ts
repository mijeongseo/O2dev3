import { locationJsonInfo } from "../searchResult/types";
import { MyimageInfo, MyimageState } from "./types";

export const GET_MY_IMAGE_LIST = 'myimage/GET_MY_IMAGE_LIST' as const;
export const SELECT_MY_IMAGE = 'myimage/SELECT_MY_IMAGE' as const;
export const SET_OPACITY = 'myimage/SET_OPACITY' as const;
export const SET_SELECT_MY_IMAGES_CLEAR = 'imageList/SET_SELECT_MY_IMAGES_CLEAR' as const; // 선택된 이미지 목록 초기화

const getMyImageList = ( data: MyimageInfo[], location: locationJsonInfo[], count: number, sr_count: number, sr_process_count: number ) => ({
  type: GET_MY_IMAGE_LIST, data, location, count, sr_count, sr_process_count });
const selectMyImage = (id: number, select: boolean, service: string, satellite: string, remain: boolean) => ({ type: SELECT_MY_IMAGE, id, select, service, satellite, remain });
const setOpacity = (id: number, service: string, opacity: number) => ({ type: SET_OPACITY, id, service, opacity });
const setSelectMyImagesClear = () => ({ type: SET_SELECT_MY_IMAGES_CLEAR });

type MyimageAction = ReturnType<typeof getMyImageList> | ReturnType<typeof selectMyImage> | ReturnType<typeof setOpacity> | ReturnType<typeof setSelectMyImagesClear>;

const initialState: MyimageState = {
  count: 0,
  sr_count: 0,
  sr_process_count: 0,
  imageList: null,
  locationJsonList: null,
  selectMyImage: null,
  imageOpacity: null,
}

export default function reducer (state: MyimageState = initialState, action: MyimageAction): MyimageState {
  switch (action.type) {
    case GET_MY_IMAGE_LIST:
      return {
        ...state,
        imageList: action.data,
        locationJsonList: action.location,
        count: action.count,
        sr_count: action.sr_count,
        sr_process_count: action.sr_process_count
      };
      case SELECT_MY_IMAGE:
        return {
          ...state,
          selectMyImage: [action.id, action.service, action.select, action.satellite], 
          imageList: state.imageList!.map((image) => 
            image.image_idx === action.id
            ? {
              ...image,
              select: action.remain, 
              select_service: image.select_service.includes(action.service)
                ? image.select_service.filter((item) => item !== action.service)
                : image.select_service.concat(action.service)
            }
            : { ...image }
          )
        };
      case SET_OPACITY:
        return {
          ...state,
          imageOpacity: [action.id, action.service, action.opacity]
        }
      case SET_SELECT_MY_IMAGES_CLEAR:
        return {
          ...state,
          imageList: state.imageList!.map((image) => 
            image.select ? 
            {
              ...image, 
              select: false,
              select_service: []
            }
            :
            {
              ...image
            }
          )
        };
    default:
      return state;
  }
}