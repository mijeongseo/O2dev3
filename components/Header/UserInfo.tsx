import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Block, UserDiv } from './styles';

type UserProps = {
  name: string;
  grade: string;
};

export default function User({ name, grade }: UserProps) {
  return (
    <UserDiv>
      <Block>
        <div className="name">{name}</div>
        <div className="grade">{grade}</div>
      </Block>
      <Block>
        <BsPersonCircle size="24" title={name} className="person" />
      </Block>
    </UserDiv>
  );
}
