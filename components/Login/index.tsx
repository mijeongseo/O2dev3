import {
  LoginFormContainer,
  LoginForm,
  LoginLabel,
  LoginInput,
  RememberMe,
  LoginBtn,
  ScrollbarWrapper,
  CloseBtn,
} from '@components/Login/styles';
import { useCallback, useRef, useState, useEffect, MutableRefObject } from 'react';
import useInput from '@hooks/useInput';
import { Auth } from 'aws-amplify';
import { useMutation, useQueryClient } from 'react-query';
import Link from 'next/link';
import ChangePwd from '@components/Login/ChangePwd';
import UserConfirm from '@components/Login/UserConfirm';
import Cookies from 'universal-cookie';
import { loadMyInfoAPI } from '@apis/user';

interface LoginProps {
  onPopup: () => void;
}

function Login({ onPopup }: LoginProps) {
  const [email, onChangeEmail, setEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [rememberId, setRememberId] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [idErr, setIdErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);
  const [forgotPwd, setForgotPwd] = useState(false);
  const pwdInput = useRef() as MutableRefObject<HTMLInputElement>;
  const idInput = useRef() as MutableRefObject<HTMLInputElement>;

  const cookies = new Cookies();

  const queryClient = useQueryClient();

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const mutation = useMutation('user', loadMyInfoAPI, {
    onMutate: () => {},
    onSuccess: (user) => {
      // console.log('!!!');
      queryClient.setQueryData('user', user);
    },
  });

  // to login
  const onLogIn = useCallback(async (email, password, rememberId) => {
    try {
      await Auth.signIn(email, password);
      // window.sessionStorage.setItem('past_id', 'true');
      mutation.mutate();
      setEmailConfirm(false);
      onPopup();
      const after30days = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
      if (rememberId) {
        //on remember check button
        if (cookies.get('user_id')) {
          //When ID is already saved
          if (cookies.get('user_id') !== email) {
            cookies.set('user_id', email, {
              path: '/',
              expires: after30days,
            });
          }
        } else {
          //save new ID
          cookies.set('user_id', email, {
            path: '/',
            expires: after30days,
          });
        }
      } else {
        if (cookies.get('user_id')) cookies.remove('user_id');
      }
    } catch (error) {
      const err: any = error;
      console.log(`login error : ${err.message}`);
      if (err.message == 'User is not confirmed.') {
        setEmailConfirm(true);
      } else if (err.message == 'Incorrect username or password.') {
        setEmailConfirm(false);
        setIdErr(false);
        setPwdErr(true);
        if (pwdInput && pwdInput.current) pwdInput.current.focus();
      } else if (err.message == 'User does not exist.') {
        setIdErr(true);
        setPwdErr(false);
        if (idInput && idInput.current) idInput.current.focus();
      }
      //추가) id와 비밀번호를 여러번 틀렸을 경우
    }
  }, []);
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onLogIn(email, password, rememberId);
    },
    [email, password, rememberId],
  );

  const onRemember = useCallback((e) => {
    setRememberId(e.target.checked);
  }, []);
  const forgotPassword = useCallback(() => {
    setForgotPwd(true);
  }, []);

  // to remove login error message
  const outIdFocus = useCallback((e) => {
    e.preventDefault();
    setIdErr(false);
  }, []);
  const outPwdFocus = useCallback((e) => {
    e.preventDefault();
    setPwdErr(false);
  }, []);

  //to login with google
  const loginWithGoogle = useCallback(async (e) => {
    e.preventDefault();
    await Auth.federatedSignIn({ customProvider: 'Google' }).then((res) => {
      // window.sessionStorage.setItem('past_id', 'true');
      // console.log(res);
    });
  }, []);

  useEffect(() => {
    if (cookies.get('user_id') !== undefined) {
      setEmail(cookies.get('user_id'));
      setRememberId(true);
    }
  }, []);

  return (
    <ScrollbarWrapper>
      {emailConfirm ? (
        <UserConfirm email={email} setEmailConfirm={setEmailConfirm} onPopup={onPopup} />
      ) : forgotPwd ? (
        <ChangePwd setPwd={setForgotPwd} onPopup={onPopup} />
      ) : (
        <LoginFormContainer>
          Welcome back
          <p>Login to your account</p>
          <LoginForm onSubmit={onSubmit}>
            <LoginLabel error={idErr}>
              <div className="inputLabel">
                ID<span>Can not befound</span>
              </div>
              <LoginInput
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChangeEmail}
                onBlur={outIdFocus}
                error={idErr}
                ref={idInput}
                required
              />
            </LoginLabel>
            <LoginLabel error={pwdErr}>
              <div className="inputLabel">
                Password<span>INCORRECT</span>
              </div>
              <LoginInput
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChangePassword}
                onBlur={outPwdFocus}
                minLength={8}
                error={pwdErr}
                ref={pwdInput}
                required
              />
            </LoginLabel>
            <RememberMe>
              <input type="checkbox" id="rememberCheck" onChange={onRemember} checked={rememberId} />
              <label htmlFor="rememberCheck" id="checkbox"></label>
              <label htmlFor="rememberCheck" id="checkTxt">
                Remember me
              </label>
              <div id="forgotPwd" onClick={forgotPassword}>
                Forgot password?
              </div>
            </RememberMe>
            <LoginBtn>
              <button type="submit" onClick={stopPropagation}>
                Login
              </button>
              <button onClick={loginWithGoogle}>
                <img src="./image/google_logo.png" alt="google logo" />
                Or sign-in with google
              </button>
              <Link href="/signup">
                <button onClick={stopPropagation}>Create Account</button>
              </Link>
            </LoginBtn>
          </LoginForm>
          <CloseBtn onClick={onPopup} />
        </LoginFormContainer>
      )}
    </ScrollbarWrapper>
  );
}

export default Login;
