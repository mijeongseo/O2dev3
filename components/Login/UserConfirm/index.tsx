import React, { useCallback } from 'react';
import { Auth } from 'aws-amplify';
import { LoginForm, LoginLabel, LoginInput, LoginBtn, CloseBtn, UserConfirmContainer } from '@components/Login/styles';

export default function Index({ email, setEmailConfirm, onPopup }) {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);
  // Email verification request page => resend email Verification
  const resendConfirmSignUp = useCallback(async (email) => {
    try {
      await Auth.resendSignUp(email);
      alert('재발송 완료');
    } catch (error) {
      const err: any = error;
      if (err.message == 'User is already confirmed.') {
        // code : InvalidParameterException:
        alert('이메일 인증이 완료되었습니다. 로그인하세요.');
      }
      console.log('error resending code', error);
    }
  }, []);
  const resendConform = useCallback(
    (e) => {
      e.preventDefault();
      resendConfirmSignUp(email);
    },
    [email],
  );
  // Email verification request page => login button event
  const goLogin = useCallback((e) => {
    e.preventDefault();
    setEmailConfirm(false);
  }, []);

  return (
    <UserConfirmContainer>
      PLEASE
      <p>CERTIFY BELOW EMAIL</p>
      <LoginForm onSubmit={resendConform}>
        <LoginLabel>
          <div className="inputLabel">EMAIL</div>
          <LoginInput type="email" id="email" name="email" value={email} readOnly />
        </LoginLabel>
        <LoginBtn id="confirmBtn">
          <button onClick={goLogin}>Login</button>
          <button type="submit" onClick={stopPropagation}>
            Resend Email
          </button>
        </LoginBtn>
      </LoginForm>
      <CloseBtn onClick={onPopup} />
    </UserConfirmContainer>
  );
}
