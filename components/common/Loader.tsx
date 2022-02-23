import React from 'react';
import styled, { keyframes } from 'styled-components';
import { COLOR } from 'styles/styles';
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderContent = styled.div`
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid ${COLOR.mint};
  width: 120px;
  height: 120px;
  -webkit-animation: ${spin} 2s linear infinite; /* Safari */
  animation: ${spin} 2s linear infinite;
`;

function Loader() {
  return (
    <LoaderContainer>
      <LoaderContent />
    </LoaderContainer>
  );
}

export default React.memo(Loader);
