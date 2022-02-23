import React, { useEffect, useRef, useState } from 'react';
import { SearchSlider, SearchSliderDiv, SearchSliderLabel } from './styles';

type DatePickerProps = {
  startDate: Date;
  endDate: Date;
  onSetSelectDate: (value: string[]) => void;
};

const createMarkList = (startDate: Date, endDate: Date) => {

  const diff = calDiff(startDate, endDate);
  const ret: { [key: number]: Object } = {};

  ret[1] = {
    label: <SearchSliderLabel style={{left: '-20px'}}>{dateToSixDigits(startDate)}</SearchSliderLabel>,
  };
  ret[diff] = {
    label: <SearchSliderLabel style={{left: '-50px'}}>{dateToSixDigits(endDate)}</SearchSliderLabel>,
  };
  
  return ret;
};

const dateToSixDigits = (value: Date) => {
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const date = value.getDate();

  return `${year.toString().substr(2)}/${month >= 10 ? month : '0' + month}/${date >= 10 ? date : '0' + date}`;
}

export const dateFormat = (value: Date) => {
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const date = value.getDate();
  
  return `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;
};

const dateCalculator = (date: Date, day?: number) => {
  
  const result = new Date(date);
  if (day) result.setDate(result.getDate() + day - 1);

  return result;
}

const calDiff = (date1: Date, date2: Date) => {
  return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
};

function DatePicker({ startDate, endDate, onSetSelectDate }: DatePickerProps) {
  
  const marks = createMarkList(startDate, endDate);
  const [value, setValue] = useState<[number, number]>([1, calDiff(startDate, endDate)]);
  const didMount = useRef(false);
  
	useEffect(() => {
    
    if (didMount.current) setValue([1, calDiff(startDate, endDate)]);
		else didMount.current = true;
	}, [startDate]);
  
  const tipFormat = (value?: number) => {
    return dateToSixDigits(dateCalculator(startDate, value));
  };
  
  const onChangeHandler = (value: [number, number]) => {
    setValue(value);
  };
  
  const onChangeValue = (value: [number, number]) => {
    onSetSelectDate([dateFormat(dateCalculator(startDate, value[0])), dateFormat(dateCalculator(startDate, value[1]))]);
  };

  return (
    <SearchSliderDiv>
      <SearchSlider
        className='datepicker'
        range
        marks={marks}
        defaultValue={[1, calDiff(startDate, endDate)]}
        // vertical={true}
        // tooltipVisible={true}
        tipFormatter={tipFormat}
        getTooltipPopupContainer={(triggerNode) => triggerNode}
        tooltipPlacement='bottom'
        max={calDiff(startDate, endDate)}
        min={1}
        onAfterChange={onChangeValue}
        onChange={onChangeHandler}
        value={value}
      />
    </SearchSliderDiv>
  );
}

export default React.memo(DatePicker);