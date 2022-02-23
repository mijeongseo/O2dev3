import styled, { css } from "styled-components";
import { COLOR } from "styles/styles";

export const HeaderDiv = styled.div<{ height: string }>`
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100vw;
  background: #0b0a0ae6;
  display: flex;

  height: ${props => props.height};
`;

export const LogoDiv = styled.div<{ height: string;  width: string; }>`
  width: ${props => props.width};
  min-width: ${props => props.width};
  line-height: ${props => props.height};

  &:hover {
    cursor: pointer;
  }
`;

export const Logo = styled.img`
  width: 99px;
  height: 21.5px;
  margin-left: 19px;
`;

export const HeaderMenuDiv = styled.div<{ active: boolean }>`
  color: #ffffff99;
  background: #b7b7b74d;
  height: 100%;
  width: 260px;
  max-width: 260px;
  min-width: 120px;
  z-index: 12;
  filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.03));
  border-radius: 0px;
  user-select:none;

  font-family: NanumSquareRound;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
  text-align: center;
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  justify-content: center;

  & + & {
    margin: 0 0.5px;
  }

  &:hover {
    cursor: pointer;
  }

  &.disabled:hover {
    cursor: default;
  }

  ${(props) =>
    props.active &&
    css`
    background: ${COLOR.mint};
    color: #ffffff;
  `}
`;

export const UserDiv = styled.div`
  color: #ffffff;
  margin: auto 10px auto auto;

  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

export const Block = styled.div`
  float: left;

  & > div {
    font-family: Noto Sans KR;
  }

  & > div.grade {
    text-align: right;
    font-size: 8px;
    line-height: 12px;
  }

  & > div.name {
    font-weight: 500;
    font-size: 11px;
    line-height: 16px;
  }
  
  & > .person {
    height: 24px;
    margin: 2px 0px auto 9px;
  }

  & > img.login {
    height: 24px;
    margin: auto 0px auto 9px;
  }
`;
