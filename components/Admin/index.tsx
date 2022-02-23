import Auth from '@aws-amplify/auth';
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import User from '@interfaces/user';
import { loadMyInfoAPI } from '@apis/user';
import axios from 'axios';
import { AdminContainer, UserImageListContainer } from './style';
import { createUserImageList } from 'utils/Admin';
import UserImageItem from './UserImageItem';
import { MyimageState } from 'store/modules/myimage/types';

export default function index() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signOut = useCallback(async () => {
    // window.sessionStorage.removeItem('past_id');
    await Auth.signOut();
    queryClient.setQueryData('user', null);
    router.replace('/');
  }, []);

  const { data: user } = useQuery<User>('user', loadMyInfoAPI, {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUserData(data);
    },
  });

  const [userData, setUserData] = useState(user);
  const [images, setImages] = useState<MyimageState | null>(null);

  useEffect(() => {
    if (userData) {
      const jsonbody = {
        email: user?.email!,
      };

      axios
        .post('https://g6wfhmytx2.execute-api.ap-northeast-2.amazonaws.com/dev/ep_allImageList_by_user', JSON.stringify(jsonbody))
        .then(async (response) => {
          const result = createUserImageList(response);
          setImages(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userData]);

  return (
    <AdminContainer>
      <button onClick={signOut}>Signout</button>
      <UserImageListContainer>
        {images
          ? images.imageList?.map((image) => {
              return image.service.map((item, num) => {
                return <UserImageItem key={num} image={image} service={item} />;
              });
            })
          : null}
      </UserImageListContainer>
    </AdminContainer>
  );
}
