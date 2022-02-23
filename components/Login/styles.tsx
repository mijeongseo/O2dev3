import styled from 'styled-components';

export const ScrollbarWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const LoginFormContainer = styled.div`
  width: auto;
  height: 855px;
  padding: 115px 68px;
  margin: 60px auto;
  position: relative;
  background: url('./image/login_bg.png') no-repeat;
  font-family: 'Roboto-Regular';
  font-size: 21.33px;
  p {
    font-family: 'Roboto-Bold';
    font-size: 40px;
    line-height: 43px;
  }
`;

export const LoginForm = styled.form`
  /* padding-top: 12px; */
`;
export const LoginLabel = styled.label<{ error?: boolean }>`
  & > .inputLabel {
    margin-top: 22px;
    display: block;
    cursor: pointer;
    position: relative;
    span {
      font-size: 18.67px;
      color: #e45a73;
      float: right;
      line-height: 33px;
      display: ${(props) => (props.error ? 'block' : 'none')};
    }
  }
`;
export const LoginInput = styled.input<{ error?: boolean }>`
  border-radius: 5px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin-top: 14px;
  width: 466.67px;
  height: 66.67px;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding-left: 30px;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
    box-shadow: ${(props) =>
      props.error
        ? ' 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(255, 0, 13, 0.3)'
        : ' 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3)'};
  }
  font-size: 18.67px;
`;

export const RememberMe = styled.div`
  position: relative;
  margin-top: 27px;
  & > #checkbox {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 20px;
    left: 0;
    position: absolute;
    top: 7px;
    width: 20px;
  }
  & > #checkbox:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: '';
    height: 6px;
    left: 3px;
    opacity: 0;
    position: absolute;
    top: 5px;
    transform: rotate(-45deg);
    width: 12px;
  }
  & > input[type='checkbox'] {
    visibility: hidden;
  }

  & > input[type='checkbox']:checked + #checkbox {
    background-color: #053d71;
    border-color: #053d71;
  }

  & > input[type='checkbox']:checked + #checkbox:after {
    opacity: 1;
  }
  & > #checkTxt {
    font-size: 18.67px;
    margin-left: 22px;
    cursor: pointer;
  }
  & > #forgotPwd {
    font-size: 18.67px;
    position: absolute;
    top: 0;
    right: 0;
    color: #053d71;
    cursor: pointer;
  }
`;

export const LoginBtn = styled.div`
  padding-top: 14px;
  /* width: 462px; */
  width: 466.67px;
  & > button {
    border: 0;
    width: 100%;
    height: 60px;
    border-radius: 5px;
    margin-top: 16px;
    box-sizing: border-box;
    cursor: pointer;
    color: white;
    font-size: 21.33px;
  }
  & > button:first-child {
    background-color: #00af93;
  }
  & > button:nth-child(2) {
    background-color: #14594e;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 10px;
    }
  }
  & > button:last-child {
    background-color: #133530;
  }
`;

export const CloseBtn = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

//--------------------------------------------------
export const UserConfirmContainer = styled.div`
  width: auto;
  height: 625px;
  padding: 115px 68px;
  margin: 100px auto;
  position: relative;
  background: url('./image/confirm_bg.png') no-repeat;
  font-family: 'Roboto-Regular';
  font-size: 21.33px;
  p {
    font-family: 'Roboto-Bold';
    font-size: 40px;
    line-height: 43px;
  }
  #confirmBtn {
    padding-top: 30px;
  }
  #confirmBtn > button {
    height: 66.67px;
    margin-top: 21px;
  }
`;
