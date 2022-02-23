import styled from 'styled-components';
import { COLOR } from 'styles/styles';

export const ResultListHeader = styled.div`
  height: 40px;
  width: 100%;
  line-height: 40px;

  font-family: NanumSquareRound;
  font-weight: bold;
  font-size: 13px;

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;

  border-bottom: 0.5px solid #b9b9b9;
  margin-bottom: 10px;
  user-select: none;

  & > div.total {
    color: rgba(0, 0, 0, 0.3);
  }

  & > div.total > span.hidden {
    display: none;
  }
`;

export const ResultListContent = styled.div`
  margin-top: 10px;
`;

export const ResultListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 50px;
  background: #EEEEEE;
  border-radius: 0px 0px 5px 5px;

  & > img {
    margin: 5px;
  }

  & > img:hover {
    cursor: pointer;
  }

  & > img:nth-last-child(1) {
    margin-right: 20px;
  }
`;

export const ImageListHeader = styled.div`
  background-color: #eeeeee;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;

  padding: 0px 15px 0px 5px;
  height: 26px;
  line-height: 26px;
  cursor: default;

  & > div {
    display: inline-block;
    text-align: center;
  }

  .date {
    width: 70px;
  }

  .satellite,
  .location {
    width: 65px;
  }

  .note {
    width: 35px;
  }

  .cloud {
    width: 35px;
    img {
      vertical-align: middle;
    }
    img.offImg {
      opacity: 0.3;
    }
  }

  .feature {
    width: 45px;
    img {
      vertical-align: middle;
    }
    img.offImg {
      opacity: 0.3;
    }
  }

  // .checkbox {
  //   width: 20px;
  //   text-align: right;

  //   input {
  //     vertical-align: middle;
  //   }
  // }

  .scroll {
    width: 13px;
  }

  user-select: none;
`;

export const ImageListConent = styled.div`
  height: 300px;
  overflow-y: scroll;
  background-color: #f8f8f8;
  padding: 5px 0px;

  &::-webkit-scrollbar {
    width: 13px;
    border-radius: 5px;
    background-color: #e7e7e7;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbcaca;
    border-radius: 5px;
  }
`;

export const ImagesItemContainer = styled.div`
  & + & {
    border-top: 0.5px solid rgba(185, 185, 185, 0.3);
  }

  padding: 2px 0px;
`;

export const ImageItemDiv = styled.div`
  &.disabled {
    background: #bfbdbd !important;
    cursor: default !important;
  }

  &:hover {
    cursor: pointer;
    background: lightgray;
  }

  padding: 2px 0px 2px 5px;

  &.selected {
    background: #00bb9d66;
  }

  font-size: 11px;

  & > div {
    display: inline-block;
    text-align: center;
    height: 18px;
    line-height: 20px;
    vertical-align: middle;
  }

  .date {
    width: 70px;
  }

  .satellite,
  .location {
    width: 65px;

    img {
      vertical-align: middle;
    }
    img.offImg {
      opacity: 0.3;
    }
  }

  .location {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .note {
    width: 35px;
  }

  .cloud {
    width: 35px;
    img {
      vertical-align: middle;
    }
    img.offImg {
      opacity: 0.3;
    }
  }

  .feature {
    width: 45px;
    img {
      vertical-align: middle;
    }
    img.offImg {
      opacity: 0.3;
    }
  }

  // .checkbox {
  //   width: 20px;
  //   text-align: right;

  //   input {
  //     vertical-align: middle;
  //   }
  // }

  user-select: none;
`;

export const ImagesResultContainer = styled.div`
  margin-top: 20px;
`;
