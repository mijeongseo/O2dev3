import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import HeaderMenu from './HeaderMenu';
import UserInfo from './UserInfo';
import LoginBtn from './LoginBtn';
import { HeaderDiv, Logo, LogoDiv } from './styles';
import { HEADER_MENU, LAYOUT_PROPS } from 'props';

import User from '@interfaces/user';
import { useQuery } from 'react-query';
import Login from '@components/Login';
import { loadMyInfoAPI } from '@apis/user';

function Header ({ value }: { value: string }) {
  const { data: user } = useQuery<User>('user', loadMyInfoAPI, {
    refetchOnWindowFocus: false,
  });

  const [popup, setPopup] = useState(false);

  const onPopup = useCallback(() => {
    setPopup((prev) => !prev);
  }, []);

  const [activeTab, setActiveTab] = useState(value);

  return (
    <>
      <HeaderDiv height={LAYOUT_PROPS.h_height}>
        <Link href="/">
          <LogoDiv height={LAYOUT_PROPS.h_height} width={LAYOUT_PROPS.s_width}>
            <Logo src="/image/logo.svg" />
          </LogoDiv>
        </Link>
        {HEADER_MENU.map((menu, idx) => {
          return (
            <HeaderMenu
              name={menu[0]}
              href={menu[1]}
              activeTab={activeTab}
              active={activeTab === menu[0] ? true : false}
              disabled={menu[2]}
              key={idx}
              onSetActiveTab={setActiveTab}
            />
          );
        })}
        {user ? <UserInfo name={user?.email} grade={user?.grade} /> : <LoginBtn onPopup={onPopup} />}
      </HeaderDiv>
      {popup && <Login onPopup={onPopup} />}
    </>
  );
}

export default React.memo(Header);
