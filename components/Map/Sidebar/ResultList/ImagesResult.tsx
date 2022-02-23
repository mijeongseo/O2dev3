import { loadMyInfoAPI } from '@apis/user';
import ClickButton from '@components/common/ClickButton';
import PushButton from '@components/common/PushButton';
import User from '@interfaces/user';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { GET_MY_IMAGE_LIST } from 'store/modules/myimage';
import { CHANGE_IMAGE_STATUS, SET_SELECT_IMAGES_CLEAR } from 'store/modules/searchResult';
import { ImageInfo } from 'store/modules/searchResult/types';
import { onOpenNotification } from 'utils/Notification';
import { setImageInfo } from 'utils/SearchImageInfo';
import UserImageList from 'utils/UserImageList';
import ImageItem from './ImageItem';
import LoadingPop from './LoadingPop';
import {
  ImageListConent,
  ImageListHeader,
  ImageListTitle,
  ImageListWarning,
  ImagesResultContainer,
  ResultListContent,
  ResultListFooter,
  ResultListHeader,
} from './style';

function ImagesResult() {
  const myImageList = useSelector((state: RootState) => state.myimage.imageList);
  const data = useSelector((state: RootState) => state.searchResult.imageList.data);
  const { data: user } = useQuery<User>('user', loadMyInfoAPI, {
    refetchOnWindowFocus: false,
  });

  const warningRef = React.useRef<HTMLDivElement>(null);

  const [internalList, setInternalList] = useState(new Set<string>());
  const [externalList, setExternalList] = useState(new Set<string>());
  const [listCount, setListCount] = useState<number>(0);
  const [triger, setTriger] = useState(false);
  const [clear, setClear] = useState(false);

  const [imgReqState, setImgReqState] = useState(false);
  const [reqData, setReqData] = useState({ email: user?.email, 'image-list': [] as any });

  const dispatch = useDispatch();
  const onSetMyImage = useCallback(
    (data, location, count, sr_count, sr_process_count) =>
      dispatch({ type: GET_MY_IMAGE_LIST, data, location, count, sr_count, sr_process_count }),
    [dispatch],
  );

  const onSetSelectImagesClear = useCallback(() => dispatch({ type: SET_SELECT_IMAGES_CLEAR }), [dispatch]);

  const onChangeActivateStatus = useCallback(
    (idx: number, name: string, after: ImageInfo) => dispatch({ type: CHANGE_IMAGE_STATUS, idx, name, after }),
    [dispatch],
  );

  useEffect(() => {
    const inList = Array.from(internalList).map((item) => JSON.parse(item));
    const exList = Array.from(externalList).map((item) => JSON.parse(item));
    setListCount(inList.length + exList.length);

    exList.length > 10 ? warningRef.current?.classList.add('warning') : warningRef.current?.classList.remove('warning');
  }, [triger]);

  const loadingPopClose = useCallback(() => {
    setImgReqState(false);
  }, []);

  const onClickPinHandler = (e: React.MouseEvent) => {
    if (!user) {
      onOpenNotification('FINDER - Result (Pin)', 'Please check your login status.', 'error');
      return;
    }

    const inList = Array.from(internalList).map((item) => JSON.parse(item));
    const exList = Array.from(externalList).map((item) => JSON.parse(item));

    if (inList.length === 0) {
      onOpenNotification('FINDER - Result (Pin)', 'Please select the images that you want.', 'error');
      return;
    } else {
      if (exList.length > 0) {
        onOpenNotification('FINDER - Result (Pin)', 'Only available for images that are already on the server.', 'warning');
        return;
      }

      const imageList = inList
        .map((image) => {
          if (myImageList?.filter((myImage) => myImage.image_idx === image.idx && myImage.service.includes(image.service)).length === 0) {
            return image;
          }
        })
        .filter((image) => image);

      if (imageList.length !== inList.length) {
        onOpenNotification('FINDER - Result (Pin)', 'The images that are already on your list.', 'warning');
      }

      const jsonbody = {
        action: 0,
        email: user?.email!,
        'image-list': inList,
      };

      axios
        .post('https://wddhaw8bp8.execute-api.ap-northeast-2.amazonaws.com/dev/ep_imagelist_by_user', JSON.stringify(jsonbody))
        .then(async (response) => {
          if (response.status === 200) {
            const result = UserImageList(response);
            onSetMyImage(result.imageList, result.locationJsonList, result.count, result.sr_count, result.sr_process_count);
            onOpenNotification('FINDER - Result (Pin)', 'The pinned images have been successfully registered.', 'success');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickActivateHandler = (e: React.MouseEvent) => {
    if (!user) {
      onOpenNotification('FINDER - Result (Activate)', 'Please check your login status.', 'error');
      return;
    }

    const inList = Array.from(internalList).map((item) => JSON.parse(item));
    const exList = Array.from(externalList).map((item) => JSON.parse(item));

    // if (exList.length === 0) {
    //   onOpenNotification('FINDER - Result (Activate)', 'Please select the images that you want to activate.', 'error');
    //   return;
    // } else
    if (exList.length > 10) {
      onOpenNotification('FINDER - Result (Activate)', 'Please select 10 or less images.', 'warning');
      return;
    } else {
      // if (inList.length > 0) {
      //   onOpenNotification('FINDER - Result (Activate)', 'Some images are already on the server.', 'warning');
      //   return;
      // }

      const checkAcitvateJson = {
        email: user?.email,
        // 'image-list': exList.map((image) => image.Product_ID)
        'image-list': exList.map((image) => image.Product_ID).concat(inList.map((image) => image.name)),
      };

      // console.log(inList)
      // console.log(checkAcitvateJson)
      axios
        .post('https://c93cbp8u8b.execute-api.ap-northeast-2.amazonaws.com/dev/ep_checkActivateImage', JSON.stringify(checkAcitvateJson))
        .then(async (response) => {
          if (response.status === 200) {
            // console.log(response)
            const res = response.data.body;
            const done = res?.filter((image) => image.done === true);
            const activating = res?.filter((image) => image.done === false && image.info !== undefined);
            const notActivate = res?.filter((image) => image.done === false && image.info === undefined);

            if (done.length > 0) {
              // console.log('activate done');
              onOpenNotification('FINDER - Result (Activate)', `${done.length} 개의 영상이 이미 activate 되어 있습니다.`, 'warning');
            }
            if (activating.length > 0) {
              // console.log('activating');
              onOpenNotification(
                'FINDER - Result (Activate)',
                `${activating.length} 개의 영상이 지금 activating 되는 중입니다.`,
                'warning',
              );
              // activating.map((image) => onChangeActivateStatus(exList.find((item) => item.Product_ID === image.name).idx, image.name, setImageInfo({ image: image.info, internal: true })))
            }
            if (notActivate.length > 0) {
              // console.log('undefined');
              const jsonbody = {
                email: user?.email,
                'image-list': exList.filter((image) => notActivate.find((item) => item.name === image.Product_ID)),
              };

              // console.log(jsonbody)

              axios
                .post('https://50zlv29f2e.execute-api.ap-northeast-2.amazonaws.com/dev/ep_imageactivation', jsonbody)
                .then(async (response) => {
                  if (response.status === 200) {
                    const imglistData = exList.map((img) => img.Product_ID);
                    setReqData({ ...reqData, 'image-list': imglistData });
                    setImgReqState(true);
                    // notActivate.map((image) => onChangeActivateStatus(exList.find((item) => item.Product_ID === image.name).idx, image.name, setImageInfo({ image: image.info, internal: true })))
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (e.currentTarget.nextElementSibling!.classList.contains('hidden')) {
      e.currentTarget.nextElementSibling!.nextElementSibling!.classList.remove('hidden');
      e.currentTarget.nextElementSibling!.classList.remove('hidden');
    } else {
      e.currentTarget.nextElementSibling!.nextElementSibling!.classList.add('hidden');
      e.currentTarget.nextElementSibling!.classList.add('hidden');
    }
  };

  const onPushButtonHandler = useCallback(() => {
    internalList.clear();
    externalList.clear();
    setInternalList(internalList);
    setExternalList(externalList);

    onSetSelectImagesClear();

    setClear(true);
    setTriger(!triger);
  }, []);

  return (
    <>
      <ImagesResultContainer>
        <ResultListHeader onClick={onClickHandler}>
          All Images
          <RiArrowDownSLine />
        </ResultListHeader>
        <ResultListContent>
          <ImageListTitle>
            Image list
            <div className="total">
              <span className={listCount == 0 ? 'hidden' : ''}>
                <PushButton size="small" name="CLEAR" onPushHandler={onPushButtonHandler} />
              </span>
              <span className={listCount == 0 ? 'hidden' : ''}> {listCount} / </span>
              <span>
                {`${
                  (typeof data?.service.origin === 'undefined' ? 0 : data?.service.origin) +
                  (typeof data?.service.ndvi === 'undefined' ? 0 : data?.service.ndvi) +
                  (typeof data?.service.ship === 'undefined' ? 0 : data?.service.ship)
                } EA`}
              </span>
            </div>
          </ImageListTitle>
          <ImageListHeader>
            <div className="keep"></div>
            <div className="date">Date</div>
            <div className="cloud">Cloud</div>
            <div className="satellite">Satellite</div>
            <div className="feature">Type</div>
            <div className="pin">Pin</div>
            <div className="scroll"></div>
          </ImageListHeader>
          <ImageListConent>
            {data?.images.map((image, idx) => {
              return (
                <ImageItem
                  image={image}
                  key={idx}
                  triger={triger}
                  onSetTriger={setTriger}
                  selectList={image.internal ? internalList : externalList}
                  onSetSelectList={image.internal ? setInternalList : setExternalList}
                  loginStatus={user ? true : false}
                  clear={clear}
                  onSetClear={setClear}
                />
              );
            })}
          </ImageListConent>
          <ImageListWarning ref={warningRef}>You can activate 10 images at once.</ImageListWarning>
        </ResultListContent>
        <ResultListFooter>
          <ClickButton name="ACTIVATE" onClickHandler={onClickActivateHandler} margin="10px 0 0 0" />
          <ClickButton name="PIN" onClickHandler={onClickPinHandler} margin="10px 0 0 0" />
        </ResultListFooter>
      </ImagesResultContainer>
      {imgReqState && <LoadingPop loadingPopClose={loadingPopClose} data={reqData} />}
    </>
  );
}

export default React.memo(ImagesResult);
