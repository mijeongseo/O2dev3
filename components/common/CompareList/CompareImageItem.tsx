import { getCloudIcon, getFeatureIcon } from '@components/Map/Sidebar/ResultList/ImageItem';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_OPACITY } from 'store/modules/myimage';
import { MyimageInfo } from 'store/modules/myimage/types';
import styled from 'styled-components';
import OpacityPicker from './OpacityPicker';

const ComapreImageItemContainer = styled.div`
  & + & {
    border-top: 0.5px solid rgba(185, 185, 185, 0.3);
  }

  padding: 2px 0px;

  &:hover {
    cursor: pointer;
    background: lightgray;
  }
  
  &.selected {
    background: #E0E0E0;
  }
  
  user-select: none;
`;

const CompareImageItemInfo = styled.div`

padding: 2px 0px 2px 5px;

font-size: 11px;

& > div {
  display: inline-block;
  text-align: center;
}

.date {
  width: 70px;
}

.satellite,
.location {
  width: 65px;
}

.cloud,
.feature {
  width: 35px;
  img {
    vertical-align: middle;
  }
  img.offImg {
    opacity: 0.3;
  }
}

`;

const CompareImageItemOpacity = styled.div`

  margin: 3px 0px;
  padding: 2px 0px 2px 5px;
  font-size: 11px;
  height: 20px;
  line-height: 20px;
  display: flex;

  & > div {
    display: inline-block;
    text-align: center;
  }

  .opacity {
    width: 70px;
    text-align: left;
    padding-left: 5px;

    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;

    letter-spacing: -0.3px;

    color: #000000;

    opacity: 0.3;
  }

  .slider {
    width: 165px;
  }

  .percent {
    width: 35px;

    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;

    text-align: center;
    letter-spacing: -0.3px;

    color: #000000;

    opacity: 0.3;
  }
`;

type CompareImageItemProps = {
  image: MyimageInfo;
  service: string;
}

function CompareImageItem ({ image, service }: CompareImageItemProps) {

  const [opacity, setOpacity] = useState<number>(100);

  const dispatch = useDispatch();
  const onSetOpacity = useCallback((id: number, service: string, opacity: number) => dispatch({type: SET_OPACITY, id, service, opacity}),[dispatch]);

  useEffect(()=>{
    onSetOpacity(image.image_idx, service, (opacity/100));
  },[opacity]);

  return (
    <ComapreImageItemContainer className='item' draggable>
      <CompareImageItemInfo>
        <div className="date" title={image.image_info.kst_date.replaceAll('-', '/')}>
          {image.image_info.kst_date.split(' ')[0].replaceAll('-', '/')}
        </div>
        <div className="cloud">{getCloudIcon(image.image_info.cloud_ratio)}</div>
        <div className="satellite">{image.image_info.satellite}</div>
        <div className="location">Location</div>
        <div className="feature">{getFeatureIcon(service, image.image_info.satellite)}</div>
        <div className="scroll"></div>
      </CompareImageItemInfo>
      <CompareImageItemOpacity>
        <div className="opacity">opacity</div>
        <div className="slider">
          <OpacityPicker onSetOpacity={setOpacity} />
        </div>
        <div className="percent">{opacity} %</div>
      </CompareImageItemOpacity>
    </ComapreImageItemContainer>
  )
}

export default React.memo(CompareImageItem);