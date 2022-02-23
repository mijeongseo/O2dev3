import styled from "styled-components";
import { COLOR } from "styles/styles";

export const ResultListDiv = styled.div`
  margin: 20px 5px 0px 5px;
`;

export const ResultListHeader = styled.div`
  height: 40px;
  width: 100%;
  line-height: 40px;

  font-family: NanumSquareRound;
  font-weight: bold;
  font-size: 13px;

  & > * {
    &:last-child {
      margin-right: 5px;
    }
  }

  border-bottom: 0.5px solid #B9B9B9;
  user-select: none;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    cursor: pointer;
  }
  `;

// margin-bottom: 10px;
// & > div.total {
//   float: right;
//   color: rgba(0, 0, 0, 0.3);
// }

// margin-top: 10px;
export const ResultListContent = styled.div`
  &.hidden {
    display: none;
  }
`;

export const ResultListFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  
  &.hidden {
    display: none;
  }
`;

export const ImageListTitle = styled.div`
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 11px;
  line-height: 30px;
  /* identical to box height, or 347% */

  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;

  color: rgba(0, 0, 0, 0.3);

  user-select: none;

  & > div.total > span.hidden {
    display: none;
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

  padding: 0px 15px 0px 10px;
  height: 26px;
  line-height: 26px;
  cursor: default;

  & > div {
    display: inline-block;
    text-align: center;
  }

  .date,
  .satellite {
    width: 75px;
  }

  .keep {
    width: 20px;
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

  .cloud,
  .pin {
    width: 35px;
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
  @import url('https://cdn.rawgit.com/innks/NanumSquareRound/master/nanumsquareround.min.css');
  font-family: 'NanumSquareRound', sans-serif;
  height: 200px;
  overflow-y: scroll;
  background-color: #f8f8f8;
  padding: 5px;

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

export const ImageListWarning = styled.div`
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.3);
  text-align: right;
  margin-top: 5px;

  user-select: none;

  &.warning {
    color: rgba(255, 0, 0, 0.7)
  }
`;

export const ImagesItemContainer = styled.div`
  & + & {
    border-top: 0.5px solid rgba(185, 185, 185, 0.3);
  }

  padding: 2px 0px;
`;

export const ImageItemDiv = styled.div`
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
  }

  .date,
  .satellite {
    width: 75px;
    img {
      vertical-align: middle;
    }
  }

  .keep {
    width: 20px;
    img {
      vertical-align: middle;
    }
    img.offImg {
      opacity: 0.3;
    }
    
    & > div {
      margin: auto;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }

    & > div.out {
      background: ${COLOR.external};
    }

    & > div.in {
      background: ${COLOR.internal};
    }

    & > div.activate {
      background: ${COLOR.activating};
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

  .cloud,
  .pin {
    width: 35px;
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
`;