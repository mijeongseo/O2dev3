import React, { useEffect, useState } from 'react';
import { SidebarContentDiv } from '../styles';
import LoginBtn from './LoginBtn';
import Userpage from './Userpage';
import { useQuery } from 'react-query';
import User from '@interfaces/user';
import { loadMyInfoAPI } from '@apis/user';
import { useRouter } from 'next/router';

function Mypage ({ select, onPopup }: { select: string; onPopup: () => void }) {

  const router = useRouter();
  const { data: user } = useQuery<User>('user', loadMyInfoAPI, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUserData(data);
    },
  });

  const [userData, setUserData] = useState(user);

  useEffect(()=> {

    if (userData) {
      userData.grade === 'ADMIN' ? router.replace('/admin') : null;
    }
  }, [userData])

  return (
    <SidebarContentDiv className={select === 'MY PAGE' ? 'block' : 'none'} style={{ paddingTop: '22px' }}>
      {user ? <Userpage user={userData} /> : <LoginBtn onPopup={onPopup} />}
    </SidebarContentDiv>
  );
}

export default React.memo(Mypage);
