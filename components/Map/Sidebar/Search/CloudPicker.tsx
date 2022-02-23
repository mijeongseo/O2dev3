import React from 'react';
import { SearchSlider, SearchSliderDiv, SearchSliderLabel } from './styles';

const markList = {
  0: {
    label: <SearchSliderLabel style={{left: '-30px'}}>0 %</SearchSliderLabel>,
  }, 
  // 100: {
  //   label: <SearchSliderLabel style={{left: '-45px'}}>100 %</SearchSliderLabel>,
  // }
}

type CloudPickerProps = {
  onSetCloudRatio: (value: number) => void;
}

function CloudPicker ({ onSetCloudRatio }: CloudPickerProps) {

  const tipFormat = (value?: number) => {
    return `${value} %`;
  };

  const onChangeValue = (value: number) => {
    onSetCloudRatio(value);
  }

  return (
    <SearchSliderDiv>
      <SearchSlider
        className='single' 
        marks={markList}
        tipFormatter={tipFormat}
        getTooltipPopupContainer={(triggerNode) => triggerNode}
        tooltipVisible={true}
        tooltipPlacement='bottom'
        defaultValue={100}
        onAfterChange={onChangeValue}
      />
    </SearchSliderDiv>
  )
}

export default React.memo(CloudPicker);