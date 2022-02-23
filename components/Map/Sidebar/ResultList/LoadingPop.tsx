import axios from 'axios';
import gsap from 'gsap';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { onOpenNotification } from 'utils/Notification';

const animate = keyframes`
    0% { height:0; opacity:0;}
    50%{ opacity:1; }
    100% { height:100%; }
`;

const Container = styled.div`
  width: 284px;
  height: 264px;
  background: url('./image/image_request_loading_pop.png') no-repeat;
  position: fixed;
  top: 50px;
  right: 10px;
  z-index: 1;

  font-size: 10px;
  font-weight: 600;

  #loading_img_wrapper {
    margin: 0 auto;
    width: 134px;
    height: 106.23px;
    position: relative;
  }
  #loading_img {
    position: absolute;
    top: 0;
    z-index: 1;
  }
  #loading_img_color {
    position: absolute;
    top: 18px;
    left: 4px;
    z-index: 0;
    height: 0;
    animation: ${animate} 1s ease-in-out infinite;
    overflow: hidden;
  }
  #loading_img_bg {
    width: 106.23px;
    height: 106.23px;
    background: #c4c4c4;
    opacity: 0.24;
    border-radius: 100%;
    margin: 0 auto;
    margin-top: 45px;
  }
  #loading_state_text {
    color: rgba(0, 0, 0, 0.43);
    text-align: center;
    margin-top: 18px;
  }
  #loading_gage {
    width: 259px;
    margin: 0 auto;
  }
  #loading_num {
    float: right;
    #countNum {
      display: inline;
    }
    span {
      color: rgba(0, 0, 0, 0.43);
    }
  }
  #loading_bar_bg {
    width: 259px;
    height: 8px;
    background: #e7e7e7;
    border-radius: 8px;
    float: left;
    #loading_bar {
      width: 0;
      height: 100%;
      border-radius: 8px;
      background: #00bb9d;
    }
  }
  .close {
    width: 35px;
    height: 35px;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  .open_list {
    width: 140px;
    height: 35px;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;
const FloatingBtn = styled.div`
  width: 60px;
  height: 50px;
  position: fixed;
  top: 50px;
  right: 0;
  z-index: 1;
  cursor: pointer;
  display: none;
  text-align: center;
`;
export default function LoadingPop({ loadingPopClose, data }) {
  const loadingBar = useRef<HTMLDivElement>(null);
  const countNum = useRef<HTMLDivElement>(null);
  const loadingContainer = useRef<HTMLDivElement>(null);
  const floatingBtn = useRef<HTMLDivElement>(null);
  const [activateDone, setActivateDone] = useState(false);
  const attemptNum = useRef(0);
  const [reqbool, setReqBool] = useState(true);

  const onhidePop = useCallback(() => {
    if (activateDone) {
      loadingPopClose();
      // gsap.set(floatingBtn.current, { display: 'none' });
    }

    gsap.to(loadingContainer.current, {
      x: 300,
      duration: 0.3,
      ease: 'circ.out',
      onComplete: () => {
        gsap.set(floatingBtn.current, { display: 'block' });
      },
    });
  }, [activateDone]);

  const onshowPop = useCallback(() => {
    gsap.to(loadingContainer.current, { x: 0, duration: 0.3, ease: 'circ.out' });
    gsap.set(floatingBtn.current, { display: 'none' });
  }, []);

  useEffect(() => {
    setActivateDone(false);
  }, []);

  const activate_request = useCallback((testData) => {
    setReqBool(false);
    // console.log(testData);
    axios
      .post('https://c93cbp8u8b.execute-api.ap-northeast-2.amazonaws.com/dev/ep_checkActivateImage', JSON.stringify(testData))
      .then((res) => {
        // console.log(res);
        if (res.data.body.filter((img) => img.done === false).length) {
          // console.log('안끝');
          setTimeout(() => {
            if (attemptNum.current >= 6) {
              setActivateDone(true);
              onOpenNotification('Activate', 'There was a problem to activate the requested image(s).', 'error');
              return console.log('요청횟수 6회이상');
            }
            // console.log(attemptNum.current + 1 + '재요청');
            activate_request(data);
            attemptNum.current++;
          }, 20000);
        } else {
          // console.log('끝');
          gsap.to(countNum.current, {
            textContent: 100,
            duration: 2,
            ease: 'circ.out',
            snap: { textContent: 1 },
            stagger: 1,
            onStart: () => {
              gsap.to(loadingBar.current, {
                width: '100%',
                duration: 2,
                ease: 'circ.out',
                onComplete: () => {
                  onOpenNotification('Activate', 'The requested image(s) have been activated.', 'success');
                  setActivateDone(true);
                },
              });
            },
          });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (reqbool) {
      gsap.ticker.lagSmoothing(0);
      gsap.to(loadingBar.current, {
        width: '95%',
        duration: 300,
        ease: 'circ.out',
        onComplete: () => {
          console.log('95%!!');
          activate_request(data);
        },
      });
      gsap.to(countNum.current, {
        textContent: 95,
        duration: 300,
        ease: 'circ.out',
        snap: { textContent: 1 },
        stagger: 1,
      });
    }
  }, [reqbool]);

  const noReloading = useCallback((e) => {
    e.preventDefault();
    e.returnValue = '';
  }, []);

  useEffect(() => {
    if (!activateDone) {
      window.addEventListener('beforeunload', noReloading);
    } else {
      window.removeEventListener('beforeunload', noReloading);
    }
  }, [activateDone]);

  return (
    <>
      <Container ref={loadingContainer}>
        <div id="loading_img_wrapper">
          <div id="loading_img">
            <img src="./image/loading_img.png" alt="loading image" />
          </div>
          <div id="loading_img_color">
            <img src="./image/loading_color.png" alt="loading image" />
          </div>
          <div id="loading_img_bg"></div>
        </div>
        <p id="loading_state_text"></p>
        <div id="loading_gage">
          <div id="loading_num">
            <div id="countNum" ref={countNum}>
              0
            </div>
            %<span> / 100%</span>
          </div>
          <div id="loading_bar_bg">
            <div id="loading_bar" ref={loadingBar}></div>
          </div>
        </div>
        <div className="close" onClick={onhidePop}></div>
        <div
          className="open_list"
          onClick={() => {
            alert('!!');
          }}
        ></div>
      </Container>
      {!activateDone && (
        <FloatingBtn ref={floatingBtn} onClick={onshowPop}>
          <img src="./image/floating_btn.png" alt="floating button" />
        </FloatingBtn>
      )}
    </>
  );
}
