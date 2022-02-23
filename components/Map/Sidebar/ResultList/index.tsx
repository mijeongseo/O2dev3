import React from 'react';
import { Divider } from 'antd';
import { ResultListDiv } from './style';
import ImagesResult from './ImagesResult';

type ResultListProps = {
  onSetPreview: (id: string) => void;
}

function ResultList ({ onSetPreview }: ResultListProps) {

  return (
    <ResultListDiv>
      <Divider style={{borderTop: '0.5px solid #B9B9B9', margin: '10px 0'}} />
      <ImagesResult />
    </ResultListDiv>
  )
}

export default React.memo(ResultList);