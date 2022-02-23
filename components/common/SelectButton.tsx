import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLOR } from 'styles/styles';

const SelectBtn = styled.span<{ size?: string; state: boolean; type?: string }>`
  padding: ${(props) => (props.size === 'small' ? '4px 5px' : '7px 20px')};
  border: 1.5px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 1000px;
  user-select: none;

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: 900;
  font-size: ${(props) => (props.size === 'small' ? '11px' : '14px')};

  text-align: center;
  letter-spacing: 0.285938px;

  &:hover {
    cursor: pointer;
  }

  & + & {
    margin-left: 5px;
  }

  color: ${(props) => (props.state ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.3)')};
  background: ${(props) => (props.state ? props.type || COLOR.mint : '#ffffff')};
`;

type SelectButtonProps = {
  size: 'small' | 'default';
  name: string;
  icon?: React.ReactNode;
  color?: string;
  value: string;
  onSetValue: (value: string) => void;
};

function SelectButton({ size, name, icon, color, value, onSetValue }: SelectButtonProps) {
  const [select, setSelect] = useState(false);
  const onClickHandle = () => {
    setSelect(!select);
    onSetValue(name);
  };

  useEffect(
    useCallback(() => {
      setSelect(value === name ? true : false);
    }, [value]),
  );

  return (
    <SelectBtn onClick={onClickHandle} size={size} state={select} type={color}>
      {icon}
      {name}
    </SelectBtn>
  );
}

export default React.memo(SelectButton);
