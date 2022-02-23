import ClickButton from '@components/common/ClickButton';
import React from 'react';
import { LoginDiv } from './styles';

function LoginBtn({ onPopup }) {
  return (
    <LoginDiv>
      <img src="./image/userLogin.png" alt="userLogin" />
      <div className="header">You need to login</div>
      <div className="content">If you want to use this page.</div>
      <ClickButton name="Go to Login" onClickHandler={onPopup} padding="0 10px" height="36px" />
    </LoginDiv>
  );
}

export default React.memo(LoginBtn);
