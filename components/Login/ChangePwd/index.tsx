import React, { useCallback, useState } from 'react';
import useInput from '@hooks/useInput';
import { Auth } from 'aws-amplify';
import { LoginForm, LoginLabel, LoginInput, LoginBtn, CloseBtn } from '@components/Login/styles';
import { ErrorMessage } from '@components/Signup/styles';
import { useRouter } from 'next/router';
import { NewPasswordContainer } from './styles';

export default function Index({ setPwd, onPopup }) {
  const [email, onChangeEmail] = useInput('');
  const [userEmail, setUserEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const onChangeCode = useCallback((e) => {
    setCode(e.target.value);
    setCodeError(e.target.value.length !== 6);
  }, []);
  const CheckPass = (str) => {
    var reg1 = /^[a-z0-9]{8,20}$/; // a-z 0-9 중에 8자리 부터 20자리만 허용
    var reg2 = /[a-z]/g;
    var reg3 = /[0-9]/g;
    return reg1.test(str) && reg2.test(str) && reg3.test(str);
  };
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    setPasswordError(!CheckPass(e.target.value));
  }, []);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordCheckError(e.target.value !== password);
    },
    [password],
  );

  const router = useRouter();

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const sendCodeMail = useCallback(
    (e) => {
      e.preventDefault();
      Auth.forgotPassword(email)
        .then((data) => {
          const resultMail = data.CodeDeliveryDetails.Destination;
          // console.log(email);
          setUserEmail(resultMail);
        })
        .catch((err) => {
          if (err.message === 'Username/client id combination not found.') {
            //UserNotFoundException
            alert('존재하지 않는 사용자');
          }
          console.log(err);
        });
    },
    [email],
  );

  const ChangePassword = useCallback(
    (e) => {
      e.preventDefault();
      const code = e.target[0].value;
      const newPwd = e.target[1].value;
      if (password !== passwordCheck) {
        return setPasswordCheckError(true);
      }
      if (code.length !== 6) {
        return setCodeError(true);
      }
      Auth.forgotPasswordSubmit(email, code, newPwd)
        .then((data) => {
          setUserEmail('');
          setPwd(false);
        })
        .catch((err) => {
          if (err.message === 'Invalid verification code provided, please try again.') {
            //CodeMismatchException
            alert('코드틀림');
          }
          //LimitExceededException: Attempt limit exceeded, please try after some time.

          console.log(err);
        });
    },
    [email],
  );

  return (
    <>
      {userEmail ? (
        <NewPasswordContainer id="long">
          We have sent a password reset code by email to {userEmail}. Enter it below to reset your password.
          <LoginForm onSubmit={ChangePassword}>
            <LoginLabel>
              <div className="inputLabel">
                Code
                {codeError && <ErrorMessage>코드는 6자리 숫자</ErrorMessage>}
              </div>
              <LoginInput type="number" id="code" name="code" value={code} onChange={onChangeCode} required />
            </LoginLabel>
            <LoginLabel>
              <div className="inputLabel">
                Password
                {passwordError && <ErrorMessage>8 or more characters, must include numbers and letters</ErrorMessage>}
              </div>
              <LoginInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                minLength={8}
                required
              />
            </LoginLabel>
            <LoginLabel>
              <div className="inputLabel">
                Password Check {passwordCheckError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
              </div>
              <LoginInput
                type="password"
                id="passwordCheck"
                name="passwordCheck"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
                minLength={8}
              />
            </LoginLabel>
            <LoginBtn>
              <button type="submit">Change Password</button>
            </LoginBtn>
          </LoginForm>
          <CloseBtn onClick={onPopup} />
        </NewPasswordContainer>
      ) : (
        <NewPasswordContainer>
          <p>Forgot your password?</p>
          Enter your Email below and we will send a code to reset your password.
          <LoginForm onSubmit={sendCodeMail}>
            <LoginLabel>
              <div className="inputLabel">Email</div>
              <LoginInput type="email" id="email" name="email" value={email} onChange={onChangeEmail} required />
            </LoginLabel>
            <LoginBtn>
              <button type="submit" onClick={stopPropagation}>
                Reset my password
              </button>
            </LoginBtn>
          </LoginForm>
          <CloseBtn onClick={onPopup} />
        </NewPasswordContainer>
      )}
    </>
  );
}
