import { SwitchChangeEventHandler } from 'antd/lib/switch';
import React, { useCallback, useEffect } from 'react';
import { MapToggleSwitch } from './style';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { SET_MAPSTYLE } from 'store/modules/mapbox';

const after30days = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
function MapToggleButton () {

  const cookies = new Cookies();
  const dispatch = useDispatch();
  const mapStyle = useSelector((state: RootState) => state.mapbox.mapStyle);
  const onSetMapStyle = useCallback((mapStyle: string) => dispatch({type: SET_MAPSTYLE, mapStyle}),[dispatch]);

  const onHandleChange: SwitchChangeEventHandler = (checked: boolean) => {    
    const mode = checked ? 'light' : 'dark';
    cookies.set('user_map_mode', mode, {
      path: '/',
      expires: after30days,
    });
    onSetMapStyle(mode);
  };
  
  useEffect(() => {
    if (!cookies.get('user_map_mode')) {
      cookies.set('user_map_mode', 'light', {
        path: '/',
        expires: after30days,
      });
      onSetMapStyle('light');
    }
    else {
      onSetMapStyle(cookies.get('user_map_mode'));
    }
  }, []);  
  
  return (
    <MapToggleSwitch checkedChildren="for dark" unCheckedChildren="for light" checked={mapStyle === 'light' ? true : false} onChange={onHandleChange} />
  )
}

export default React.memo(MapToggleButton);