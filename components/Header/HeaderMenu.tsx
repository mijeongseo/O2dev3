import React from 'react';
import Link from 'next/link';
import { HeaderMenuDiv } from './styles';

type HeaderMenuProps = {
  name: string;
  active: boolean;
  href: string;
  activeTab: string;
  onSetActiveTab: (name: string) => void;
  disabled?: string;
};

export default function HeaderMenu({ name, active, href, activeTab, onSetActiveTab, disabled }: HeaderMenuProps) {

  const onClickHandler = () => {
    activeTab !== name ? onSetActiveTab(name) : null;
  }

  return ( 
    (disabled !== 'disabled') ? 
      <Link href={href}>
        <HeaderMenuDiv active={active} onClick={onClickHandler}>{name}</HeaderMenuDiv>
      </Link> 
    :  
      <HeaderMenuDiv active={active} className={disabled}>{name}</HeaderMenuDiv>
  );
}
