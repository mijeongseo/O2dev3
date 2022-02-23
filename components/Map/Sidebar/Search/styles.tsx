import { Slider } from 'antd';
import styled from 'styled-components';
import { COLOR } from 'styles/styles';

export const SearchInputDiv = styled.div`
  display: flex;
  height: 40px;
  width: 100%;
  justify-content: space-between;
`;

export const SearchInput = styled.input`
  background: #f8f8f8;
  border-radius: 6.5px;
  border: none;

  width: 80%;

  padding: 0px 13px;

  font-family: NanumSquareRound;
  font-weight: 700;
  font-size: 13px;
  line-height: 19px;

  color: #767b82;
  opacity: 0.8;
`;

export const SearchAOIButton = styled.button`
  background: #f8f8f8;
  border-radius: 6.5px;
  border: none;

  width: 15%;
  line-height: 19px;

  color: #767b82;
  opacity: 0.8;

  &:hover {
    background-color: #aeb2b9 !important;
    cursor: pointer;
  }

  &.clicked {
    background-color: #c3c7cf;
  }
`;

export const SearchButton = styled.button`
  width: 100%;
  height: 43px;
  background-color: ${COLOR.mint};
  border: none;
  border-radius: 5px;

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  color: #ffffff;

  &:hover {
    background-color: rgba(17, 204, 174, 1);
    cursor: pointer;
  }
`;

export const SearchMenuDiv = styled.div`

  margin: 2px 8px;

  & + & {
    margin-top: 15px;
  }
`;

export const SearchMenuHeader = styled.div<{ hover?: boolean }>`
  height: 40px;
  width: 100%;
  line-height: 40px;
  margin-bottom: 10px;

  font-family: NanumSquareRound;
  font-weight: bold;
  font-size: 16px;

  user-select: none;

  & > img {
    margin-right: 5px;
  }

  & > svg {
    float: right;
    line-height: 40px;
    height: 40px;
  }

  &:hover {
    cursor: ${props => props.hover ? 'pointer' : 'default' };
  }
`;

export const SearchMenuContent = styled.div`
  &.hidden {
    display: none;
  }
`;

export const SearchSliderDiv = styled.div`
  height: 40px;

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

export const SearchSlider = styled(Slider)`
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
  }
`;

export const SearchSliderLabel = styled.div`
  margin-top: 10px;
  position: absolute;
  width: 70px;

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: 800;
  font-size: 11px;
  line-height: 13px;
  letter-spacing: -0.3px;

  color: rgba(0, 0, 0, 0.25);

  `;
  // font-family: NanumSquareRound;
  // font-style: normal;
  // font-weight: 800;
  // font-size: 11px;

  // color: ${COLOR.mint};