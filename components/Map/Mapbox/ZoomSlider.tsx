import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import { SET_ZOOMLEVEL } from 'store/modules/mapbox';
import { CustomZoomSlider, CustomZoomSliderDiv } from './style';

const makeZoomMarks = (min: number, max: number, refNum: number) => {
  const diff = max - min;
  const step = refNum/(diff);
  const marks: {[key: number]: string} = {};
  
  for (let i = 0; i < diff + 1; i++) {
    marks[Math.round(step * i)] = (i === 0 || i === diff) ? Math.round(step * i).toString() : '';
  }

  return marks;
}

const calZoomLevel = (min: number, max: number, refNum: number, value: number) => {
  const diff = max - min;
  const step = refNum/(diff);

  return Math.round(value/step) + min;
}

function ZoomSlider () {

  const dispatch = useDispatch();
  const maxZoom = useSelector((state: RootState) => state.mapbox.viewport.maxZoom);
  const minZoom = useSelector((state: RootState) => state.mapbox.viewport.minZoom);
  const zoom = useSelector((state: RootState) => state.mapbox.viewport.zoom);

  const onSetZoomLevel = useCallback((zoom : number) => dispatch({type: SET_ZOOMLEVEL, zoom}),[dispatch]);

  const onCalZoomLevel = (value: number) => {
    console.log(calZoomLevel(minZoom!, maxZoom!, 100, value));
  }

  return (
    <CustomZoomSliderDiv>
      <CustomZoomSlider
        marks={makeZoomMarks(minZoom!, maxZoom!, 100)}
        included={false}
        defaultValue={0}
        tooltipVisible
        getTooltipPopupContainer={(triggerNode) => triggerNode}
        step={null}
        // onAfterChange={onCalZoomLevel}
        onChange={onCalZoomLevel}
      />
    </CustomZoomSliderDiv>
  )
}

export default React.memo(ZoomSlider);