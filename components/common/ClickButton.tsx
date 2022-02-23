import React from 'react';
import styled from 'styled-components';
import { COLOR } from 'styles/styles';

const ClickBtn = styled.button<{ height?: string }>`
  width: calc(100% - 10px);
  height: ${props => props.height || '36px'};
  background-color: ${COLOR.mint};
  border: none;
  border-radius: 5px;

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  color: #ffffff;

  &:hover {
    background-color: rgba(17, 204, 174, 1);
    cursor: pointer;
  }
`;

const ClickButtonDiv = styled.div<{ padding?: string, margin?: string }>`
  width: 100%;
  margin: ${props => props.margin || '30px 0 0 0'};
  text-align: center;
  padding: ${props => props.padding || '0px'};
`;

type ClickButtonProps = {
  name: string;
  onClickHandler: any;
  height?: string;
  padding?: string;
  margin?: string;
}

function ClickButton ({ name, onClickHandler, height, padding, margin }: ClickButtonProps) {
  return (
    <ClickButtonDiv padding={padding} margin={margin}>
      <ClickBtn onClick={onClickHandler} height={height}>{name}</ClickBtn>
    </ClickButtonDiv>
  )
}

export default React.memo(ClickButton);