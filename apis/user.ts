import axios from 'axios';
import { Auth } from 'aws-amplify';
export function confirmUserAPI(data: { email: string }) {
  return axios.post('https://slranrqrxf.execute-api.ap-northeast-2.amazonaws.com/mmtest_api_stage/mmtest_create_table', data);
}
export function realSignupAPI(data: { email: string; nickname: string }) {
  return axios.post('https://slranrqrxf.execute-api.ap-northeast-2.amazonaws.com/mmtest_api_stage/mmtest_restapi', data);
}
export const loadMyInfoAPI = async () => {
  /* if (!window.sessionStorage.getItem('past_id')) {
    Auth.signOut().then((response) => {
      return response;
    });
  } else {
    const response = await Auth.currentUserInfo().then((response) => {
      return confirmUserAPI({ email: response.attributes.email });
    });
    return response.data;
  } */
  const response = await Auth.currentUserInfo().then((response) => {
    return confirmUserAPI({ email: response.attributes.email });
  });
  return response.data;
};
export async function loadSSRMyInfo(data: { email: string }) {
  const result = await axios
    .post('https://slranrqrxf.execute-api.ap-northeast-2.amazonaws.com/mmtest_api_stage/mmtest_create_table', data)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(error);
    });
  // console.log(result);
  return result;
}
