import Slider from '@ant-design/react-slick';
import ClickButton from '@components/common/ClickButton';
import Loader from '@components/common/Loader';
import SelectButton from '@components/common/SelectButton';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { SET_VIEWPORT } from 'store/modules/mapbox';
import { SET_SEARCH_LOCATION_INFO } from 'store/modules/searchAddress';
import { SET_LOCATION_SEARCH_MODE } from 'store/modules/searchInfo';
import { GET_IMAGE_LIST, GET_IMAGE_LIST_ERROR, GET_IMAGE_LIST_SUCCESS, SELECT_IMAGE } from 'store/modules/searchResult';
import Address from 'utils/Address';
import { onOpenNotification } from 'utils/Notification';
import SearchImageInfo from 'utils/SearchImageInfo';
import { SidebarContentDiv } from '../styles';
import CloudPicker from './CloudPicker';
import DatePicker, { dateFormat } from './DatePicker';
import SearchMenu from './SearchMenu';
import { SearchAOIButton, SearchInput, SearchInputDiv } from './styles';

const now: Date = new Date();

const period: [number, string][] = [
  [1, 'w'],
  [2, 'w'],
  [1, 'm'],
  [3, 'm'],
  [1, 'y'],
];

type SearchProps = {
  select: string;
  children?: React.ReactNode;
};

function Search ({ select, children }: SearchProps) {
  
  const aoiMode = useSelector((state: RootState) => state.searchInfo.mode);
  const searchAddress = useSelector((state: RootState) => state.searchAddress.address);
  const { loading, error, data } = useSelector((state: RootState) => state.searchResult.imageList);

  // dispatch
  const dispatch = useDispatch();

  const onSetViewport = useCallback((latitude, longitude, zoom) => dispatch({ type: SET_VIEWPORT, latitude, longitude, zoom }), [dispatch]);

  const onChangeAoiMode = useCallback((mode) => dispatch({ type: SET_LOCATION_SEARCH_MODE, mode }), [dispatch]);
  const onSetSearchAddress = useCallback((keyword, address) => dispatch({ type: SET_SEARCH_LOCATION_INFO, keyword, address }), [dispatch]);

  const fetchImageList = async ( location: string, startDate: string, endDate: string, lat: number, lng: number, zoom: number, cloudRatio: number ) => {
  
    dispatch({ type: GET_IMAGE_LIST });
    onSetViewport(lat, lng, zoom);
  
    try {
      const response = await axios.get(
        `https://50zlv29f2e.execute-api.ap-northeast-2.amazonaws.com/dev/ep_searchList?index=0&region=${location}&startdate=${startDate}&enddate=${endDate}&cloudratio=${cloudRatio}`
      );

      const result = SearchImageInfo(response.data);

      dispatch({ type: GET_IMAGE_LIST_SUCCESS, data: result });
    } catch (e) {
      dispatch({ type: GET_IMAGE_LIST_ERROR, error: e });
    }
  };

  const [datePeriod, setDatePeriod] = useState(createDateValue(period[2]));
  const [locSelect, setLocSelect] = useState('');
  const [date, setDate] = useState([new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()), now]);
  const [dateSelect, setDateSelect] = useState([dateFormat(date[0]), dateFormat(date[1])]); // startdate, enddate
  const [cloud, setCloud] = useState<number>(100);

  const locInputRef = useRef<HTMLInputElement>(null);

  const onSetLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocSelect(e.target.value);
  };
  useEffect(
    useCallback(() => {
      locInputRef.current && (locInputRef.current.value = locSelect);
    }, [locSelect]),
  );

  useEffect(() => {
    setDate(calDate(datePeriod));
    setDateSelect([dateFormat(calDate(datePeriod)[0]), dateFormat(calDate(datePeriod)[1])])
  }, [datePeriod]);

  const onAOIClickHandler = (e: React.MouseEvent) => {
    // console.log('click');
    onChangeAoiMode(!aoiMode);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return false;
    }
    onFinish();
  };

  const onFinish = async () => {
    if (locSelect.trim() === '') {
      onOpenNotification('FINDER - Location', 'Please enter the location correctly.', 'error');
      return false;
    }

    const addressInfo = await Address(locSelect);
    onSetSearchAddress(locSelect, addressInfo!.locationName[0]);

    if (addressInfo === null) {
      onOpenNotification('FINDER - Location', 'Please enter the location correctly.', 'error');
      return false;
    }

    fetchImageList(locSelect, dateSelect[0], dateSelect[1], addressInfo.lat, addressInfo.lng, addressInfo.zoom, cloud);
    // fetchImageList(addressInfo.locationName[0], dateSelect[0], dateSelect[1], addressInfo.lat, addressInfo.lng, addressInfo.zoom, cloud);
  };

  return (
    <React.Fragment>
      {loading && <Loader />}
      {error && <p style={{ textAlign: 'center' }}>에러 발생</p>}
      <SidebarContentDiv className={select === 'FINDER' ? 'block' : 'none'} style={{ padding: '18px' }}>
        <SearchMenu imgSrc="/icon/sidebar/map_pin.svg" title="Location">
          <SearchInputDiv>
            <SearchInput
              placeholder="Where do you want to see?"
              onChange={onSetLocation}
              ref={locInputRef}
              onKeyPress={onKeyPressHandler}
            />
            <SearchAOIButton title={`Draw Region Of Interest (ROI)`} onClick={onAOIClickHandler} className={aoiMode ? 'clicked' : ''}>
              <img src="./icon/sidebar/location_roi.svg" alt="" />
            </SearchAOIButton>
          </SearchInputDiv>
        </SearchMenu>
        <SearchMenu imgSrc="/icon/sidebar/calendar.svg" title="Date" hideFunc={true}>
          <div>
            {period.map((date, index) => {
              return <SelectButton size="small" name={createDateValue(date)} onSetValue={setDatePeriod} value={datePeriod} key={index} />;
            })}
          </div>
          <DatePicker startDate={date[0]} endDate={date[1]} onSetSelectDate={setDateSelect} />
        </SearchMenu>
        <SearchMenu imgSrc="/icon/sidebar/cloud.svg" title="Cloud" hideFunc={true}>
          <CloudPicker onSetCloudRatio={setCloud} />
        </SearchMenu>
        <ClickButton name="SEARCH" onClickHandler={onFinish} margin='20px 0 0 0' />
        {children}
      </SidebarContentDiv>
    </React.Fragment>
  );
}

const calDate = (value: string) => {
  const date = period.find((element) => createDateValue(element) === value)!;

  if (date[1] === 'w') {
    return [new Date(now.getFullYear(), now.getMonth(), now.getDate() - date[0] * 7 + 1), now];
  } else if (date[1] === 'm') {
    return [new Date(now.getFullYear(), now.getMonth() - date[0], now.getDate() + 1), now];
  } else if (date[1] === 'y') {
    return [new Date(now.getFullYear() - date[0], now.getMonth(), now.getDate() + 1), now];
  } else {
    return [now, now];
  }
};

const createDateValue = (value: [number, string]) => {
  let result = value[0].toString();

  if (value[1] === 'w') {
    result += ' week';
  } else if (value[1] === 'm') {
    result += ' month';
  } else if (value[1] === 'y') {
    result += ' year';
  }

  if (value[0] === 1) {
    return result;
  } else {
    return result + 's';
  }
};

export default React.memo(Search);
