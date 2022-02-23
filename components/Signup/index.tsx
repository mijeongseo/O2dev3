import React, { useCallback, useState, useEffect } from 'react';
import useInput from '@hooks/useInput';
import { Auth } from 'aws-amplify';
import { LoginForm, LoginLabel, LoginInput, RememberMe, LoginBtn } from '@components/Login/styles';
import Router from 'next/router';
import { ErrorMessage, SignupFormContainer } from '@components/Signup/styles';
import { useQuery, useQueryClient } from 'react-query';
import { loadMyInfoAPI } from '@apis/user';
import User from '@interfaces/user';

export default function Index() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  /*  const { data: user } = useQuery<User>('user', loadMyInfoAPI, {
    refetchOnWindowFocus: false,
  }); */
  useEffect(() => {
    if (user) {
      console.log('redirects to /');
      Router.replace('/');
    }
  }, [user]);

  const [email, onChangeEmail] = useInput('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  // check password
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
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSignup = useCallback(async (email, password) => {
    const username = email;
    await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    })
      .then((res) => {
        console.log(res);
        alert('메일인증 후 로그인 가능');
        Router.replace('/');
      })
      .catch((error) => {
        console.log('error signing up:', error);
        if (error.code === 'UsernameExistsException') {
          //UsernameExistsException: An account with the given email already exists.
          alert('이미 가입 된 이메일입니다.');
        }
      });
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordCheckError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      onSignup(email, password);
    },
    [email, password, passwordCheck, term],
  );

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <SignupFormContainer>
      PLEASE
      <p>CREATE ACCOUNT</p>
      <LoginForm onSubmit={onSubmit}>
        <LoginLabel>
          <div className="inputLabel">EMAIL</div>
          <LoginInput type="email" id="email" name="email" value={email} onChange={onChangeEmail} required />
        </LoginLabel>
        <LoginLabel>
          <div className="inputLabel">
            PASSWORD
            {passwordError && <ErrorMessage>8 or more characters, must include numbers and letters</ErrorMessage>}
          </div>
          <LoginInput type="password" id="password" name="password" value={password} onChange={onChangePassword} minLength={8} required />
        </LoginLabel>
        <LoginLabel>
          <div className="inputLabel">
            PASSWORD CHECK
            {passwordCheckError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
          </div>
          <LoginInput
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            minLength={8}
            required
          />
        </LoginLabel>
        <RememberMe>
          <input type="checkbox" id="rememberCheck" checked={term} onChange={onChangeTerm} />
          <label htmlFor="rememberCheck" id="checkbox"></label>
          <label htmlFor="rememberCheck" id="checkTxt">
            Accept the terms and conditions
          </label>
          {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
        </RememberMe>

        <LoginBtn>
          <button type="submit" onClick={stopPropagation}>
            CREATE ACCOUNT
          </button>
        </LoginBtn>
      </LoginForm>
    </SignupFormContainer>
  );
}
