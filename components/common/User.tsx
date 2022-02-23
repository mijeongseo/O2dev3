import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
// import { BsPeopleCircle } from 'react-icons/bs';

const UserDiv = styled.div`
  color: #ffffff;
  margin: auto 24px auto auto;
`;

// margin-left: 9px;
const Block = styled.div`
  float: left;

  &:last-child {
    height: 24px;
    margin: 2px 0px auto 9px;
  }

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
`;

export default function User() {
  return (
    <UserDiv>
      <Block>{/* <BsPeopleCircle size="24" /> */}</Block>
    </UserDiv>
  );
}
