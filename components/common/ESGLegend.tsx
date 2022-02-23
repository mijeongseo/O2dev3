import React from 'react'
import styled from 'styled-components'

const ESGLegendContainer = styled.div`
  width: 80px;
  height: 280px;
  display: flex;
  opacity: 0.8;

  position: fixed;
  bottom: 70px;
  right: 10px;

  background: white;
  padding: 10px;
  border-radius: 5px;
`;

const ESGGradient = styled.div`
  width: 15px;
  height: 100%;
  margin-bottom: 10px;
  border-radius: 15px;
  background: linear-gradient( to top, #2B83BA, #ABDDA4, #FFFFBF, #FDAE61, #D7191C );
`;

const ESGLabel = styled.div`
  width: 40px;
  height: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 5px;
  
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: 800;
  font-size: 15px;
  line-height: 15px;
`;

const label = ['180 (ppb)', '135', '90', '45', '0'];

function ESGLegend () {
  return (
    <ESGLegendContainer>
      <ESGGradient />
      <ESGLabel>
      {
        label.map((item, index) => {
          return <div key={index}>{item}</div>;
        })
      }
      </ESGLabel>
    </ESGLegendContainer>
  )
}

export default React.memo(ESGLegend)