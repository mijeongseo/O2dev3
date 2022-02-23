import { ImageListInfo, ImageInfo } from './types';
import { AxiosError } from 'axios';

//액션 타입 선언
export const GET_IMAGE_LIST = 'imageList/GET_IMAGE_LIST' as const; //요청이 시작됐을 때
export const GET_IMAGE_LIST_SUCCESS = 'imageList/GET_IMAGE_LIST_SUCCESS' as const; //요청 성공
export const GET_IMAGE_LIST_ERROR = 'imageList/GET_IMAGE_LIST_ERROR' as const; //요청 실패
export const SELECT_IMAGE = 'imageList/SELECT_IMAGE' as const; // 이미지 선택
export const SET_SELECT_IMAGES_CLEAR = 'imageList/SET_SELECT_IMAGES_CLEAR' as const; // 선택된 이미지 목록 초기화
export const CHANGE_IMAGE_STATUS = 'imageList/CHANGE_IMAGE_STATUS' as const; // activate 한 이미지에 대한 정보 변경

//액션 생성 함수
const getImageList = () => ({ type: GET_IMAGE_LIST });
const getImageListSuccess = (data: ImageListInfo) => ({ type: GET_IMAGE_LIST_SUCCESS, data });
const getImageListError = (error: AxiosError) => ({ type: GET_IMAGE_LIST_ERROR, error });
const selectImage = (id: number, select: boolean, service: string, internal: boolean, satellite: string) => ({
  type: SELECT_IMAGE,
  id,
  select,
  service,
  internal,
  satellite,
});
const setSelectImagesClear = () => ({ type: SET_SELECT_IMAGES_CLEAR });
const changeImageStatus = (idx: number, name: string, after: ImageInfo) => ({ type: CHANGE_IMAGE_STATUS, idx, name, after });

//액션 타입 정의
type ImageListAction =
  | ReturnType<typeof getImageList>
  | ReturnType<typeof getImageListSuccess>
  | ReturnType<typeof getImageListError>
  | ReturnType<typeof selectImage>
  | ReturnType<typeof setSelectImagesClear>
  | ReturnType<typeof changeImageStatus>;

//상태 타입 정의
export type ImageListState = {
  imageList: {
    loading: boolean;
    error: Error | null;
    data: ImageListInfo | null;
  };
};

//초기 상태 정의
const initialState: ImageListState = {
  imageList: {
    loading: false,
    error: null,
    data: null,
  },
};

//리듀서 생성
export default function reducer(state: ImageListState = initialState, action: ImageListAction): ImageListState {
  switch (action.type) {
    case GET_IMAGE_LIST:
      return { ...state, imageList: { loading: true, error: null, data: null } };
    case GET_IMAGE_LIST_SUCCESS:
      return { ...state, imageList: { loading: false, error: null, data: action.data } };
    case GET_IMAGE_LIST_ERROR:
      return { ...state, imageList: { loading: false, error: action.error, data: null } };
    case SELECT_IMAGE:
      return {
        ...state,
        imageList: {
          loading: false,
          error: null,
          data: {
            ...state.imageList.data!,
            selectImage: [action.internal, action.id, action.service, action.select, action.satellite],
            images: state.imageList.data?.images.map((image) =>
              image.idx === action.id && image.internal === action.internal
                ? {
                    ...image,
                    select: action.select,
                    service: image.service.includes(action.service)
                      ? image.service.filter((item) => item !== action.service)
                      : image.service.concat(action.service),
                  }
                : // : {
                  //   ...image,
                  //   select: false
                  //  }
                  { ...image },
            )!,
          },
        },
      };
    case SET_SELECT_IMAGES_CLEAR:
      return {
        ...state,
        imageList: {
          loading: false,
          error: null,
          data: {
            ...state.imageList.data!,
            images: state.imageList.data!.images.map((image) =>
              image.select
                ? {
                    ...image,
                    select: false,
                  }
                : {
                    ...image,
                  },
            ),
          },
        },
      };
    case CHANGE_IMAGE_STATUS:
      return {
        ...state,
        imageList: {
          loading: false,
          error: null,
          data: {
            ...state.imageList.data!,
            count: state.imageList.data!.count,
            locationJsonList: state.imageList.data!.locationJsonList.map((json) => 
              json.idx === action.idx && json.internal === false ? {
                ...json,
                internal: true,
                idx: action.after.idx
              } : {
                ...json
              }
            ),
            images: state.imageList.data!.images.map((image) => 
              image.name !== action.name ? {
                ...image
              } :
              {
                ...image,
                image: action.after
              }
            )
          },
        },
      };
    default:
      return state;
  }
}
