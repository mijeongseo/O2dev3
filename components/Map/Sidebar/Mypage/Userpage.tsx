import { Divider } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { MypageUserInfoDiv, UserInfoDiv, UserInfoItem, UserNameDiv } from './styles';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GET_MY_IMAGE_LIST } from 'store/modules/myimage';
import MypageResultList from './MypageResultList';
import { RootState } from 'store/modules';
import UserImageList from 'utils/UserImageList';

function Userpage({ user }) {
  const queryClient = useQueryClient();
  const signOut = useCallback(async () => {
    // window.sessionStorage.removeItem('past_id');
    await Auth.signOut();
    queryClient.setQueryData('user', null);
  }, []);

  const myImageList = useSelector((state: RootState) => state.myimage);
  // const [myImageList, setMyImageList] = useState<MyimageState | null>(null);

  const dispatch = useDispatch();
  const onSetMyImage = useCallback(
    (data, location, count, sr_count, sr_process_count) =>
      dispatch({ type: GET_MY_IMAGE_LIST, data, location, count, sr_count, sr_process_count }),
    [dispatch],
  );

  useEffect(() => {
    const jsonbody = {
      email: user?.email!,
    };

    axios
      .post('https://g6wfhmytx2.execute-api.ap-northeast-2.amazonaws.com/dev/ep_allImageList_by_user', JSON.stringify(jsonbody))
      .then(async (response) => {
        // setMyImageList(result);
        const result = UserImageList(response);
        onSetMyImage(result.imageList, result.locationJsonList, result.count, result.sr_count, result.sr_process_count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <MypageUserInfoDiv>
      <UserNameDiv>
        <div className="userName">{user?.email}</div>
        <img className="logout" src="./icon/sidebar/logout.svg" alt="logout" onClick={signOut} />
      </UserNameDiv>
      <Divider style={{ borderTop: '0.5px solid #B9B9B9', margin: '5px 0' }} />
      <UserInfoDiv>
        <UserInfoItem>
          <div className="itemName">Membership</div>
          <div className="itemContent">{user?.grade}</div>
        </UserInfoItem>
        <UserInfoItem>
          <div className="itemName">Remaining SR Size</div>
          <div className="itemContent">
            {
              user?.email === 'jayoh@naraspace.com' ? <>1,728 km<sup>2</sup></> : <>0 km<sup>2</sup></>
            }
            {/* {
              user?.grade === 'NST' ? '00' : <>0 km<sup>2</sup></>
            } */}
          </div>
        </UserInfoItem>
        <UserInfoItem>
          {/* <div className="itemExplain">{myImageList?.sr_process_count} Requests are in process</div> */}
          <div className="itemExplain">
            {
              user?.email === 'jayoh@naraspace.com' ? '3 Requests are in process' : '0 Requests are in process'
            }
            {/* 3 Requests are in process */}
          </div>
        </UserInfoItem>
        <UserInfoItem>
          <div className="itemName"># of My Images</div>
          <div className="itemContent">{myImageList?.count + myImageList?.sr_count}</div>
        </UserInfoItem>
        <UserInfoItem>
          <div className="itemName"># of SR Images</div>
          <div className="itemContent">{myImageList?.sr_count}</div>
        </UserInfoItem>
      </UserInfoDiv>
      <Divider style={{ borderTop: '0.5px solid #B9B9B9', margin: '5px 0' }} />
      {myImageList && <MypageResultList imageData={myImageList} />}
    </MypageUserInfoDiv>
  );
}

export default React.memo(Userpage);
