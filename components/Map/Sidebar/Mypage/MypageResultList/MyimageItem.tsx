import React, { useCallback, useEffect } from 'react';
import { chkSatellite, getCloudIcon, getFeatureIcon } from '@components/Map/Sidebar/ResultList/ImageItem';
import { ImagesItemContainer, ImageItemDiv } from './style';
import { SELECT_MY_IMAGE } from 'store/modules/myimage';
import { useDispatch } from 'react-redux';
import { MyimageInfo } from 'store/modules/myimage/types';
import { onOpenNotification } from 'utils/Notification';

type MyimageItemProps = {
  image: MyimageInfo;
  selectList: Set<string>;
  onSetSelectList: (list: Set<string>) => void;
  triger: boolean;
  onSetTriger: (triger: boolean) => void;
  clear: boolean;
  onSetClear: (clear: boolean) => void;
};

const createImageInfo = (idx: number, service: string, name: string, satellite: string) => {
  const tempItem = {
    idx: idx,
    service: service,
    name: name,
    satellite: satellite,
  };

  return JSON.stringify(tempItem);
};

const SELECT_CLASS = 'selected';

function MyimageItem({ image, selectList, onSetSelectList, triger, onSetTriger, clear, onSetClear }: MyimageItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  // const services = image.services.filter((service) => service === 'ship' || service === 'ndvi');

  const dispatch = useDispatch();
  const onSelectMyImage = useCallback(
    (id: number, select: boolean, service: string, satellite: string, remain: boolean) =>
      dispatch({ type: SELECT_MY_IMAGE, id, select, service, satellite, remain }),
    [dispatch],
  );

  const onSelectItemHandler = (e: React.MouseEvent) => {
    const target: Element = e.currentTarget;
    let result = false;

    if (target.getAttribute('data-service')! === 'sr') {
      if (parseInt(target.getAttribute('data-status')!) !== 4) {
        onOpenNotification('MY PAGE - Image', 'This image is still in SR process.', 'warning');
        return;
      }
    }

    // 다른 노드들 체크
    // 다른 노드들 중 하나라도 선택된게 있으면 result true
    target.parentNode?.querySelectorAll(':scope > div').forEach((div) => {
      if (target !== div && div.classList.contains(SELECT_CLASS)) {
        result = true;
      }
    });

    if (target.classList.contains(SELECT_CLASS)) {
      target.classList.remove(SELECT_CLASS);
      onSelectMyImage(image.image_idx, false, target.getAttribute('data-service')!, image.image_info.satellite, result);
      selectList.delete(createImageInfo(image.image_info.idx, target.getAttribute('data-service')!, image.image_info.name, image.image_info.satellite));
    } else {
      target.classList.add(SELECT_CLASS);
      onSelectMyImage(image.image_idx, true, target.getAttribute('data-service')!, image.image_info.satellite, true);
      selectList.add(createImageInfo(image.image_info.idx, target.getAttribute('data-service')!, image.image_info.name, image.image_info.satellite));
    }
    onSetSelectList(selectList);
    onSetTriger(!triger);
  };

  useEffect(() => {
    if (clear) {
      onSetClear(false);
      for (let i = 0 ; i < itemRef.current!.children.length; i++) {
        itemRef.current!.children[i].classList.contains(SELECT_CLASS) ? itemRef.current!.children[i].classList.remove(SELECT_CLASS) : null
      }
    }
  }, [clear]);

  return (
    <ImagesItemContainer ref={itemRef}>
      {image.service
        .sort()
        .sort((a, b) => {
          let aN = 2;
          let bN = 2;

          if (a === 'origin') {
            aN = 1;
          }
          if (b === 'origin') {
            bN = 1;
          }

          return aN - bN;
        })
        .map((item, idx) => {
          return idx === 0 ? (
            <ImageItemDiv key={idx} data-service={item} onClick={onSelectItemHandler}>
              <div className="date" title={image.image_info.kst_date.replaceAll('-', '/')}>
                {image.image_info.kst_date.split(' ')[0].replaceAll('-', '/')}
              </div>
              <div className="cloud">{chkSatellite(image.image_info.satellite) ? getCloudIcon(image.image_info.cloud_ratio) : '-'}</div>
              <div className="satellite">{image.image_info.satellite}</div>
              <div
                className="location"
                title={image.image_info.location ? image.image_info?.location[image.image_info?.location.length - 2] : undefined}
              >
                {image.image_info.location ? image.image_info?.location[image.image_info?.location.length - 1] : ''}
              </div>
              <div className="feature">{getFeatureIcon(item, image.image_info.satellite)}</div>
              <div className="note">-</div>
              {/* <div className="checkbox">
                <input type="checkbox" name="myImage" onClick={onCheckItemHandler} />
              </div> */}
              <div className="scroll"></div>
            </ImageItemDiv>
          ) : (
            <ImageItemDiv key={idx} data-service={item} onClick={onSelectItemHandler}>
              <div className="date"></div>
              <div className="cloud"></div>
              <div className="satellite"></div>
              <div className="location">
                <img src="./icon/sidebar/other_service.svg" alt="" />
              </div>
              <div className="feature">{getFeatureIcon(item, image.image_info.satellite)}</div>
              <div className="note">-</div>
              {/* <div className="checkbox">
                <input type="checkbox" name="myImage" onClick={onCheckItemHandler} />
              </div> */}
              <div className="scroll"></div>
            </ImageItemDiv>
          );
        })}
      {image.sr !== 0 ? (
        <ImageItemDiv data-service={'sr'} data-status={image.sr} onClick={onSelectItemHandler} className={image.sr !== 4 ? 'disabled' : ''}>
          <div className="date"></div>
          <div className="cloud"></div>
          <div className="satellite"></div>
          <div className="location">
            <img src="./icon/sidebar/other_service.svg" alt="" />
          </div>
          <div className="feature">{getFeatureIcon('sr', image.image_info.satellite)}</div>
          <div className="note">-</div>
          {/* <div className="checkbox">
            <input type="checkbox" name="myImage" onClick={onCheckItemHandler} />
          </div> */}
          <div className="scroll"></div>
        </ImageItemDiv>
      ) : null}
    </ImagesItemContainer>
  );
}

export default React.memo(MyimageItem);
