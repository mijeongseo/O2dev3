import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLOR } from 'styles/styles';

const PushBtn = styled.span<{ size?: string; background?: string }>`
  padding: ${(props) => (props.size === 'small' ? '1px 4px' : '4px 5px')};
  box-sizing: border-box;
  border-radius: 1000px;
  user-select: none;
  
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: 800;
  font-size: ${(props) => (props.size === 'small' ? '8px' : '11px')};
  
  text-align: center;
  line-height: 21px;
  letter-spacing: -0.2px;
  
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
  
  & + & {
    margin-left: 5px;
  }

  border: 1.5px solid ${(props) => (props.background ? props.background : COLOR.mint)};
  color: ${(props) => (props.background ? props.background : COLOR.mint)};
  background: ${(props) => (props.background ? props.background : '#ffffff')};
`;

type PushButtonProps = {
  size: 'small' | 'default';
  name: string;
  icon?: React.ReactNode;
  color?: string;
  onPushHandler: any;
};

function PushButton({ size, name, icon, color, onPushHandler }: PushButtonProps) {

  const onClickHandle = () => {
    onPushHandler();
  };

  return (
    <PushBtn onClick={onClickHandle} size={size} background={color}>
      {icon}
      {name}
    </PushBtn>
  );
}

export default React.memo(PushButton);
