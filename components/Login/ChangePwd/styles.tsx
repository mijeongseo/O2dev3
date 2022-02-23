import styled from 'styled-components';

export const NewPasswordContainer = styled.div`
  width: 602.66px;
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
  &#long {
    height: 850px;
    background: url('./image/login_bg.png') no-repeat;
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
