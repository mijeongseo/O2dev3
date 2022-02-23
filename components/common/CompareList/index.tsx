import React, { useEffect, useState } from 'react';
import { MyimageInfo } from 'store/modules/myimage/types';
import styled from 'styled-components';
import ClickButton from '../ClickButton';
import CompareImageItem from './CompareImageItem';

const CompareListDiv = styled.div`
  position: absolute;
  top: 55px;
  right: 10px;
  width: 330px;
  user-select: none;
  background: #FFFFFF;
  border-radius: 5px;
  padding: 12px;
`;

const CompareListTitle = styled.div`

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;

  color: #000000;

  margin-bottom: 5px;

  height: 18px;
  line-height: 20px;

  & > div.close {
    float: right;
    color: rgba(0, 0, 0, 0.3);
  }
  
  & > * {
    &:last-child {
      margin-right: 5px;
    }

`;

const CompareListContent = styled.div`
  margin-top: 10px;
`;

const ImageListHeader = styled.div`
  background-color: #eeeeee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;

  padding: 0px 15px 0px 5px;
  height: 26px;
  line-height: 26px;
  cursor: default;

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

  .scroll {
    width: 13px;
  }

  user-select: none;
`;

const ImageListConent = styled.div`
  font-family: 'NanumSquareRound', sans-serif;
  height: 250px;
  overflow-y: scroll;
  background-color: #f8f8f8;
  padding: 5px 0px;

  &::-webkit-scrollbar {
    width: 13px;
    border-radius: 5px;
    background-color: #e7e7e7;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #cbcaca;
    border-radius: 5px;
  }
`;

const CompareListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CompareListMode = styled.div`
  text-align: right;
  border-top: 0.1px solid rgba(0, 0, 0, 0.3);
  padding-top: 5px;
  
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: -0.3px;

  color: rgba(0, 0, 0, 0.7);

  & > select {
    margin-left: 5px;
  }

  select::-ms-expand { 
    display: none;
  }

  select {
    -o-appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    padding: 3px 12px;
    text-align: center;
    border-radius: 10px;

    background: #E4E4E4;
    border: none;
    outline: 0 none;
  }
`;

type CompareListProps = {
  myImageList: MyimageInfo[];
}

export default function CompareList ({ myImageList }: CompareListProps) {

  const [flag, setFlag] = useState(false);
  const [mode, setMode] = useState('opacity');

  useEffect(() => {
    // console.log(myImageList);
    if (!flag) {
      setFlag(true);
      return;
    }
    // const test = document.querySelectorAll('.compareList .item');
    // console.log(test)
  }, [myImageList]);

  const onChangeModeHandler = (e: React.ChangeEvent) => {
    const target: any = e.target;
    setMode(target.options[target.options.selectedIndex].value);
  }

  return (
    <CompareListDiv>
      <CompareListTitle>
        <img src="./icon/sidebar/compare.svg" alt="" /> Compare List
        <div className="close">
          <img src="./icon/close.svg" alt="" />
        </div>
      </CompareListTitle>
      {/* <CompareListMode>
        compare mode : 
        <select onChange={onChangeModeHandler} defaultValue={mode === 'opacity' ? 'opacity' : 'split'}>
          <option value="opacity">opacity</option>
          <option value="split">split</option>
        </select>
      </CompareListMode> */}
      <CompareListContent>
        <ImageListHeader>
          <div className="date">Date</div>
          <div className="cloud">Cloud</div>
          <div className="satellite">Satellite</div>
          <div className="location">Location</div>
          <div className="feature">Type</div>
          <div className="scroll"></div>
        </ImageListHeader>
        <ImageListConent className='compareList'>
          {
            myImageList?.map((image, idx) => {
              return image.select_service.map((item, num) => {
                return <CompareImageItem key={num} image={image} service={item} />;
              })
            })
          }
        </ImageListConent>
      </CompareListContent>
      <CompareListFooter>
        <ClickButton name="FINISH" onClickHandler={()=>{}} margin="10px 0 0 0" />
      </CompareListFooter>
    </CompareListDiv>
  )
}