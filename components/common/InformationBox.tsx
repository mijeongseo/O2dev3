import ClickButton from '@components/common/ClickButton';
import { chkSatellite, getCloudIcon } from '@components/Map/Sidebar/ResultList/ImageItem';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { ImageInfo } from 'store/modules/searchResult/types';
import styled from 'styled-components';
import ReverseGeocode from 'utils/ReverseGeocode';

const InformationBoxDiv = styled.div`
  position: absolute;
  top: 55px;
  right: 10px;
  width: 300px;
  user-select: none;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 12px;
`;

const InformationTitle = styled.div`
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;

  color: #000000;

  margin-bottom: 5px;

  &:after{display:inline-block; height:100%; content:""; vertical-align:middle;}
  img{vertical-align:middle;}

`;

const InformationContent = styled.div`

  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 13px 17px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InformationItem = styled.div`

  display: flex;
  align-items: center;

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;

  color: rgba(0, 0, 0, 0.85);

  height: 18px;
  line-height: 18px;

  & > div.item:nth-child(1) {
    flex-shrink: 0;
    width: 80px;
  }

  & > div.item:nth-child(2) {
    padding-right: 20px;
  }

  & > div.item:nth-child(3) {
    flex-grow: 1;
  }
`;

type InformationBoxProps = {
  image: ImageInfo;
}

function InformationBox ({ image }: InformationBoxProps) {

  const searchLocation = useSelector((state: RootState) => state.searchAddress.address);

  return (
    <InformationBoxDiv>
      <InformationTitle>
        <img src="./icon/sidebar/info.svg" alt="" /> Information
      </InformationTitle>
      <InformationContent>
        <InformationItem>
          <div className="item">Date</div>
          <div className="item">:</div>
          <div className="item">{image.kst_date}</div>
        </InformationItem>
        <InformationItem>
          <div className="item">Location</div>
          <div className="item">:</div>
          <div className="item">{image.internal ? image.location ? `${image?.location[image?.location.length - 2]}, ${image?.location[image?.location.length - 1]}` : '' : searchLocation}</div>
        </InformationItem>
        <InformationItem>
          <div className="item">Cloud</div>
          <div className="item">:</div>
          <div className="item">
            {
              chkSatellite(image.satellite) ? (<>{getCloudIcon(image.cloud_ratio)} {image.cloud_ratio.toFixed(2)} %</>) : '-'
            }
          </div>
        </InformationItem>
        <InformationItem>
          <div className="item">Satellite</div>
          <div className="item">:</div>
          <div className="item">{image.satellite}</div>
        </InformationItem>
      </InformationContent>
      <ClickButton name="ACTIVATE" onClickHandler={()=>{}} margin="8px 0px 0px 0px" />
    </InformationBoxDiv>
  )
}

export default React.memo(InformationBox);