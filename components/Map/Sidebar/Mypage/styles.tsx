import styled from "styled-components";

export const LoginDiv = styled.div`
  user-select: none;
  margin: 20px;
  text-align: center;

  & > div.header {

    margin-top: 37px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;

    letter-spacing: -0.035em;

    color: #000000;
  }

  & > div.content {

    margin-bottom: 63px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 17px;
    line-height: 24px;

    letter-spacing: -0.005em;

    color: #000000;
  }
`;

export const MypageUserInfoDiv = styled.div`
  user-select: none;
  margin-right: 1px;
`;

export const UserNameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 9px;
  padding: 0 2px;

  & > div.userName {
    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: -0.03em;
  }

  & > img.logout {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export const UserInfoDiv = styled.div`
  margin: 15px 0;
  padding: 0 2px;
`;

export const UserInfoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > div.itemName {
    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 15px;
    letter-spacing: -0.01em;

    color: rgba(0, 0, 0, 0.8);
  }

  & > div.itemContent {
    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 15px;

    text-align: right;
    letter-spacing: -0.01em;

    color: #00bb9d;
  }

  & > div.itemExplain {
    font-family: NanumSquareRound;
    font-style: normal;
    font-weight: bold;
    font-size: 13px;
    line-height: 15px;
    color: rgba(0, 0, 0, 0.3);
  }

  & + & {
    margin-top: 18px;
  }
`;