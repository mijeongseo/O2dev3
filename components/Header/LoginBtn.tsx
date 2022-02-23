import React from 'react';
import { Block, UserDiv } from './styles';

interface LoginBtnProps {
  onPopup: () => void;
}

export default function LoginBtn({ onPopup }: LoginBtnProps) {
  return (
    <UserDiv>
      <Block>
        <img src="./icon/login.svg" alt="" onClick={onPopup} className="login" />
      </Block>
    </UserDiv>
  );
}
