import { Slider } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { COLOR } from 'styles/styles';

const OpacityPickerContianer = styled.div`

  line-height: 18px;
  height: 18px;
  width: 95%;
  position: relative;
  top: 3px;

  .ant-tooltip-inner {
    background: none;
    box-shadow: none;
    color: ${COLOR.mint};

    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: bold;
    font-size: 11px;

    margin-top: -8px;
  }

  .ant-tooltip-arrow {
    display: none;
  }
  user-select: none;
`;

const OpacitySlider = styled(Slider)`
  margin-top: 25px;

  & .ant-slider-handle,
  &:hover .ant-slider-handle {
    border: 4px solid ${COLOR.mint} !important;
  }

  & .ant-slider-track,
  &:hover .ant-slider-track {
    background-color: ${COLOR.mint} !important;
  }

  & .ant-slider-dot {
    top: -5px;
    margin-left: -7px;
    margin-bottom: -7px;
    border: 4px solid #f0f0f0;
    width: 14px;
    height: 14px;
  }

  & .ant-slider-mark {
    z-index: 0;
  }

  & .ant-slider-handle {
    z-index: 1;
  }

  &.datepicker .ant-slider-dot:nth-child(2) {
    display: none;
  }

  &.single .ant-slider-dot:nth-child(1) {
    display: none;
  }

  &.single div.ant-tooltip-inner {
    background: white;
  }

  &.single {
    margin-top: 0px;
    margin-bottom: 0px;
  }

  & .ant-slider-rail {
    background-color: #D1D1D1;
  }
`;

type OpacityPickerProps = {
  onSetOpacity: (opacity: number) => void;
}

function OpacityPicker ({ onSetOpacity }: OpacityPickerProps) {

  const onChangeValue = (value: number) => {
    onSetOpacity(value);
  }

  const onAfterChangeValue = (value: number) => {
    // onSetOpacity(value);
  }

  return (
    <OpacityPickerContianer>
      <OpacitySlider
        className='single' 
        tooltipVisible={false}
        defaultValue={100}
        onChange={onChangeValue}
        onAfterChange={onAfterChangeValue}
      />
    </OpacityPickerContianer>
  )
}

export default React.memo(OpacityPicker);