import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { SELECT_IMAGE } from 'store/modules/searchResult';
import { ImageInfo } from 'store/modules/searchResult/types';
import { ImagesItemContainer, ImageItemDiv } from './style';

export const getCloudIcon = (cloud?: number) => {
  if (typeof cloud === 'undefined') {
    return '-';
  } else if (cloud <= 10) {
    return <img src={`./icon/cloud/cloud_0.svg`} alt="" title={`${cloud.toFixed(2)} %`} />;
  } else if (cloud <= 50) {
    return <img src={`./icon/cloud/cloud_33.svg`} alt="" title={`${cloud.toFixed(2)} %`} />;
  } else if (cloud <= 90) {
    return <img src={`./icon/cloud/cloud_66.svg`} alt="" title={`${cloud.toFixed(2)} %`} />;
  } else if (cloud >= 90) {
    return <img src={`./icon/cloud/cloud_100.svg`} alt="" title={`${cloud.toFixed(2)} %`} />;
  }
};

export const getFeatureIcon = (service: string, satellite: string) => {
  if (service !== 'origin') {
    return <img src={`./icon/feature/${service}.svg`} alt="" title={service.toUpperCase()} />;
  } else {
    if (satellite === 'ICEYE') {
      return <img src={`./icon/feature/sar.svg`} alt="" title={'sar'.toUpperCase()} />;
    } else if (satellite === 'GHGSat-C2') {
      return <img src={`./icon/feature/methane.svg`} alt="" title={'methane'.toUpperCase()} />;
    } else {
      return <img src={`./icon/feature/rgb.svg`} alt="" title={'rgb'.toUpperCase()} />;
    }
  }
};

export const chkSatellite = (satellite: string) => {
  let result = false;
  switch (satellite) {
    case 'GHGSat-C2':
    case 'ICEYE':
      result = false;
      break;
    default:
      result = true;
      break;
  }

  return result;
}

type ImageItemProps = {
  image: ImageInfo;
  triger: boolean;
  onSetTriger: (triger: boolean) => void;
  selectList: Set<string>;
  loginStatus: boolean;
  onSetSelectList: (list: Set<string>) => void;
  clear: boolean;
  onSetClear: (clear: boolean) => void;
};

const getCenterLocation = (bounds: number[]) => {
  return [(bounds[3] + bounds[1]) / 2, (bounds[2] + bounds[0]) / 2];
};

const createImageInfo = (
  idx: number,
  internal: boolean,
  service: string,
  name: string,
  satellite: string,
  search: string,
  bounds: number[],
  timestamp: number,
) => {
  if (internal) {
    const tempItem = {
      idx: idx,
      name: name.replace('.tif', ''), 
      service: service,
    };
    return JSON.stringify(tempItem);
  } else {
    const tempItem = {
      idx: idx, 
      Product_ID: name,
      Satellite: satellite,
      Center: getCenterLocation(bounds),
      Search: search,
      Bounds: bounds,
      Timestamp: timestamp
    };
    return JSON.stringify(tempItem);
  }
};

const SELECT_CLASS = 'selected';

// allSelect
function ImageItem({ image, triger, onSetTriger, selectList, loginStatus, onSetSelectList, clear, onSetClear }: ImageItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const myImageList = useSelector((state: RootState) => state.myimage.imageList);
  const searchInfo = useSelector((state: RootState) => state.searchAddress);
  const services = image.services.filter((service) => service === 'ship' || service === 'ndvi');

  const dispatch = useDispatch();
  const onSelectImage = useCallback(
    (id: number, select: boolean, service: string, internal: boolean, satellite: string) => dispatch({ type: SELECT_IMAGE, id, select, service, internal, satellite }),
    [dispatch],
  );

  const onSelectItemHandler = (e: React.MouseEvent) => {
    const target: Element = e.currentTarget;

    target.parentNode?.querySelectorAll(':scope > div').forEach((div) => {
      if (target !== div && div.classList.contains(SELECT_CLASS)) {
        div.classList.remove(SELECT_CLASS);
        if (image.internal) {
          selectList.delete(createImageInfo(image.idx, image.internal, div.getAttribute('data-service')!, image.name, image.satellite, searchInfo.keyword, image.bounds, image.image_timestamp));
        }
        onSelectImage(image.idx, true, target.getAttribute('data-service')!, image.internal, image.satellite);

      } else if (target === div) {
        if (div.classList.contains(SELECT_CLASS)) {
          div.classList.remove(SELECT_CLASS);
          selectList.delete(createImageInfo(image.idx, image.internal, div.getAttribute('data-service')!, image.name, image.satellite, searchInfo.keyword, image.bounds, image.image_timestamp));
          onSelectImage(image.idx, false, div.getAttribute('data-service')!, image.internal, image.satellite);

        } else {
          div.classList.add(SELECT_CLASS);
          selectList.add(createImageInfo(image.idx, image.internal, div.getAttribute('data-service')!, image.name, image.satellite, searchInfo.keyword, image.bounds, image.image_timestamp));
          onSelectImage(image.idx, true, div.getAttribute('data-service')!, image.internal, image.satellite);
        }
      }
    });
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
      <ImageItemDiv data-service="origin" onClick={onSelectItemHandler} data-done={image.done}>
        <div className="keep">{image.internal ? (image.done ? <div className="in"></div> : <div className="activate"></div>) : <div className="out"></div>}</div>
        <div className="date" title={image.kst_date.replaceAll('-', '/')}>
          {image.kst_date.split(' ')[0].replaceAll('-', '/')}
        </div>
        <div className="cloud">
          {
            chkSatellite(image.satellite) ? getCloudIcon(image.cloud_ratio) : '-'
          }
        </div>
        <div className="satellite">{image.satellite}</div>
        <div className="feature">{getFeatureIcon('origin', image.satellite)}</div>
        <div className="pin">
          {loginStatus
            ? image.internal
              ? myImageList?.filter((myImage) => myImage.image_idx === image.idx && myImage.service.includes('origin')).length !== 0
                ? 'Y'
                : 'N'
              : '-'
            : '-'}
        </div>
        <div className="scroll"></div>
      </ImageItemDiv>
      {!image.internal
        ? null
        : services.map((service, idx) => {
            return (
              <ImageItemDiv key={idx} data-service={service} onClick={onSelectItemHandler}>
                <div className="keep"></div>
                <div className="date"></div>
                <div className="cloud"></div>
                <div className="satellite">
                  <img src="./icon/sidebar/other_service.svg" alt="" />
                </div>
                <div className="feature">{getFeatureIcon(service, image.satellite)}</div>
                <div className="pin">
                  {loginStatus
                    ? myImageList?.filter((myImage) => myImage.image_idx === image.idx && myImage.service.includes(service)).length !== 0
                      ? 'Y'
                      : 'N'
                    : '-'}
                </div>
                <div className="scroll"></div>
              </ImageItemDiv>
            );
          })}
    </ImagesItemContainer>
  );
}

export default React.memo(ImageItem);
