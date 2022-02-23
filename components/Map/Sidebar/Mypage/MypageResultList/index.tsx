import { loadMyInfoAPI } from '@apis/user';
import PushButton from '@components/common/PushButton';
import User from '@interfaces/user';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { GET_MY_IMAGE_LIST, SET_SELECT_MY_IMAGES_CLEAR } from 'store/modules/myimage';
import { MyimageState } from 'store/modules/myimage/types';
import { onOpenNotification } from 'utils/Notification';
import UserImageList from 'utils/UserImageList';
import ImageDownloadPop from './ImageDownloadPop';
import MyimageItem from './MyimageItem';
import { ImageListConent, ImageListHeader, ImagesResultContainer, ResultListContent, ResultListFooter, ResultListHeader } from './style';

type MypageResultListProps = {
  imageData: MyimageState;
};

function MypageResultList({ imageData }: MypageResultListProps) {
  const { data: user } = useQuery<User>('user', loadMyInfoAPI, {
    refetchOnWindowFocus: false,
  });

  const [selectList, setSelectList] = useState(new Set<string>());
  const [openImgDownPop, setOpenImgDownPop] = useState(false);

  const [listCount, setListCount] = useState<number>(0);
  const [triger, setTriger] = useState(false);
  const [clear, setClear] = useState(false);

  const dispatch = useDispatch();
  const onSetMyImage = useCallback(
    (data, location, count, sr_count, sr_process_count) =>
      dispatch({ type: GET_MY_IMAGE_LIST, data, location, count, sr_count, sr_process_count }),
    [dispatch],
  );

  const onSetSelectMyImagesClear = useCallback(() =>
      dispatch({ type: SET_SELECT_MY_IMAGES_CLEAR }),
    [dispatch],
  );

  useEffect(() => {
    if (selectList.size === 0) {
      return;
    }
  }, [selectList]);

  // useEffect(() => {
  //   if (!allSelect) {
  //     selectList.clear();
  //     setSelectList(selectList);
  //   }
  // }, [allSelect]);

  // const onClickSelectHandler = (e: React.MouseEvent) => {
  //   const target: any = e.currentTarget;
  //   target.checked ? setAllSelect(true) : setAllSelect(false);
  // };

  const setDownpop = useCallback(() => {
    setOpenImgDownPop((prev) => !prev);
  }, []);

  const onClickDownloadHandler = (e: React.MouseEvent) => {
    const list = Array.from(selectList).map((item) => JSON.parse(item));

    if (list.length === 0) {
      onOpenNotification('MY PAGE - Download', 'Please select the images that you want.', 'error');
      return;
    }

    // console.log(list)

    setDownpop();
  };

  const onClickSRRequestHandler = (e: React.MouseEvent) => {
    const list = Array.from(selectList).map((item) => JSON.parse(item));
    const originList = list.filter((image) => image.service === 'origin');

    if (originList.length === 0) {
      onOpenNotification('MY PAGE - SR Request', 'Please select the origin images that you want.', 'error');
      return;
    }

    const jsonbody = {
      action: 1,
      email: user?.email!,
      'image-list': originList,
    };

    // console.log(jsonbody)

    // axios
    //   .post('https://wddhaw8bp8.execute-api.ap-northeast-2.amazonaws.com/dev/ep_imagelist_by_user', JSON.stringify(jsonbody))
    //   .then(async (response) => {
    //     // console.log(response)
    //     // if (response.status === 200) {
    //     //   const result = UserImageList(response);
    //     //   onSetMyImage(result.imageList, result.locationJsonList, result.count, result.sr_count, result.sr_process_count);
    //     //   onOpenNotification('MY PAGE - SR Request', 'The SR request has been completed successfully.', 'success');
    //     // }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const onClickDeactivateHandler = (e: React.MouseEvent) => {
    const list = Array.from(selectList).map((item) => JSON.parse(item));

    if (list.length === 0) {
      onOpenNotification('MY PAGE - Deactivate', 'Please select the images that you want.', 'error');
      return;
    }

    const jsonbody = {
      action: 2,
      email: user?.email!,
      'image-list': list,
    };

    axios
      .post('https://wddhaw8bp8.execute-api.ap-northeast-2.amazonaws.com/dev/ep_imagelist_by_user', JSON.stringify(jsonbody))
      .then(async (response) => {
        if (response.status === 200) {          
          const result = UserImageList(response);
          onPushButtonHandler();
          onSetMyImage(result.imageList, result.locationJsonList, result.count, result.sr_count, result.sr_process_count);
          onOpenNotification('MY PAGE - Deactivate', 'The pinned images have been successfully deregistered.', 'success');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const list = Array.from(selectList).map((item) => JSON.parse(item));
    setListCount(list.length);
  }, [triger]);

  const onPushButtonHandler = useCallback(() => {
    selectList.clear();
    setSelectList(selectList);

    onSetSelectMyImagesClear();

    setClear(true);
    setTriger(!triger);
  }, []);

  return (
    <>
      <ImagesResultContainer>
        <ResultListHeader>
          All Images
          <div className="total">
            <span className={listCount == 0 ? 'hidden' : ''}>
              <PushButton size="small" name="CLEAR" onPushHandler={onPushButtonHandler} />
            </span>
            <span className={listCount == 0 ? 'hidden' : ''}> {listCount} / </span>
            <span>{`${imageData.count + imageData.sr_count} EA`}</span>
          </div>
        </ResultListHeader>
        <ResultListContent>
          <ImageListHeader>
            <div className="date">Date</div>
            <div className="cloud">Cloud</div>
            <div className="satellite">Satellite</div>
            <div className="location">Location</div>
            <div className="feature">Type</div>
            <div className="note">Note</div>
            {/* <div className="checkbox">
              <input type="checkbox" name="myImage" onClick={onClickSelectHandler} />
            </div> */}
            <div className="scroll"></div>
          </ImageListHeader>
          <ImageListConent>
            {imageData.imageList?.map((image, idx) => {
              return <MyimageItem key={idx} image={image} selectList={selectList} onSetSelectList={setSelectList} triger={triger} onSetTriger={setTriger} clear={clear} onSetClear={setClear}/>;
            })}
          </ImageListConent>
        </ResultListContent>
        <ResultListFooter>
          <img src="/icon/mypage/open.svg" alt="" title="" />
          <img src="/icon/mypage/sr_request.svg" alt="SR Image request" title="SR Image request" onClick={onClickSRRequestHandler} />
          <img src="/icon/mypage/download.svg" alt="Image download" title="Image download" onClick={onClickDownloadHandler} />
          <img src="/icon/mypage/delete.svg" alt="Pin deactivate" title="Pin deactivate" onClick={onClickDeactivateHandler} />
        </ResultListFooter>
      </ImagesResultContainer>
      {openImgDownPop && <ImageDownloadPop setDownpop={setDownpop} />}
    </>
  );
}

export default React.memo(MypageResultList);
