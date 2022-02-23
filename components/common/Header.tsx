import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
// import User from './User';

const HeaderDiv = styled.div<{ height: string }>`
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100vw;
  background: #0b0a0ae6;
  display: flex;

  height: ${(props) => props.height};
`;

const LogoDiv = styled.div<{ height: string; width: string }>`
  width: ${(props) => props.width};
  /* line-height: ${(props) => props.height}; */
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 99px;
  height: 21.5px;
  margin-left: 19px;
`;

type HeaderProps = {
  headerHeight: string;
  logoWidth: string;
  children?: React.ReactNode;
};

export default function Header({ headerHeight, logoWidth, children }: HeaderProps) {
  return (
    <HeaderDiv height={headerHeight}>
      <Link href="/">
        <LogoDiv height={headerHeight} width={logoWidth}>
          <Logo src="/image/logo.svg" />
        </LogoDiv>
      </Link>
      {children}
      {/* <User name="Naraspace Technology" grade="Master" /> */}
    </HeaderDiv>
  );
}
