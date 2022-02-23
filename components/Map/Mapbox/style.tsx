import { Switch, Slider } from "antd";
import styled from "styled-components";

export const MapboxDiv = styled.div<{ height: string; width: string }>`
  position: absolute;
  top: ${(props) => props.height};
  right: 0;
  height: calc(100vh - ${(props) => props.height} + 30px);
  width: calc(100vw - ${(props) => props.width});
  background: white;

  & div.mapboxgl-control-container {
    display: none;
  }
`;

export const MapToggleSwitch = styled(Switch)`
  position: absolute;
  right: 25px;
  bottom: 25px;
  width: 48px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.6);

  .ant-switch-handle {
    top: 4px;
    left: 4px;
    width: 16px;
    height: 16px;
  }

  &.ant-switch-checked {
    background-color: #a1a1a1;
  }

  &.ant-switch-checked .ant-switch-handle {
    left: calc(100% - 16px - 4px) !important;
  }

  &.ant-switch-checked .ant-switch-handle:before {
    background-color: #515151;
  }

  .ant-switch-inner {
    position: absolute;
    top: -20px;
    left: 0px;
    width: 100%;
    display: block;
    margin: 0;

    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;

    color: rgba(255, 255, 255, 0.48);
  }

  &.ant-switch-checked .ant-switch-inner {
    color: rgba(0, 0, 0, 0.48);
  }
`;

export const CustomZoomSliderDiv = styled.div`
  width: 240px;
  position: absolute;
  bottom: 25px;
  right: 90px;
`;

export const CustomZoomSlider = styled(Slider)`
  margin: 40px 10px 4px 10px;

  & .ant-slider-rail {
    background-color: #a3a8af;
    height: 1px;
    left: 10px;
    width: 90%;
  }

  & .ant-slider-dot:first-child::before {
    content: "\f068";
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
    width: 20px;
    height: 20px;
    color: #a3a8af;
  }

  & .ant-slider-dot:last-child::before {
    content: "\f067";
    font-family: "Font Awesome 5 Free";
    font-weight: 600;
    width: 20px;
    height: 20px;
    color: #a3a8af;
  }

  & .ant-slider-dot:first-child,
  & .ant-slider-dot:last-child {
    margin-left: -12px;
    top: -12px;
    height: 24px;
    width: 24px;
    text-align: center;
    border: 2px solid #a3a8af;
    border-radius: 50%;
    background: none;
    z-index: 1;
  }

  & .ant-slider-dot {
    border-radius: 0%;
    width: 0px;
    height: 10px;
    border: 0.5px solid white;
    top: -4px;
  }

  & .ant-slider-handle {
    height: 16px;
    width: 16px;
    margin-top: -8px;
    border: 2px solid white;
    box-shadow: 0px 5px 5px rgba(255, 255, 255, 0.15);
  }

  & .ant-slider-mark {
    top: -28px;
  }

  & .ant-tooltip-arrow {
    display: none;
  }

  & .ant-slider-mark-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: #a3a8af;
  }

  & .ant-tooltip-inner {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    color: white;
    background: none;
    box-shadow: none;
  }

  & .ant-tooltip-placement-top {
    top: -4px !important;
  }
`;