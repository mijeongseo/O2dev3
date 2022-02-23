import React, { useEffect, useState } from 'react';
import InformationBox from '@components/common/InformationBox';
import MapToggleButton from './MapToggleButton';
import Viewport from './Viewport';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import CompareList from '@components/common/CompareList';
import ESGLegend from '@components/common/ESGLegend';

type MapboxProps = {
  preview: string;
  sidebarSelect: string;
};

function Mapbox({ preview, sidebarSelect }: MapboxProps) {
  const data = useSelector((state: RootState) => state.searchResult.imageList.data);
  const selectImage = useSelector((state: RootState) => state.searchResult.imageList.data?.selectImage);
  const myImageList = useSelector((state: RootState) => state.myimage.imageList?.filter((image) => image.select))!;
  const selectMyImage = useSelector((state: RootState) => state.myimage.selectMyImage);

  const [methane, setMethane] = useState<boolean>(false);

  useEffect(() => {
    if (sidebarSelect === 'FINDER') {
      if (!selectImage) {
        return;
      }
      selectImage[4] === 'GHGSat-C2' && selectImage[3] ? setMethane(true) : setMethane(false);
    } else if (sidebarSelect === 'MY PAGE') {
      if (!selectMyImage) {
        return;
      }
      selectMyImage[3] === 'GHGSat-C2' && selectMyImage[2] ? setMethane(true) : setMethane(false);
    }
  }, [selectImage, selectMyImage, sidebarSelect]);

  return (
    <React.Fragment>
      <Viewport preview={preview} sidebarSelect={sidebarSelect} />
      <MapToggleButton />
      {/* <ZoomSlider /> */}
      {sidebarSelect === 'FINDER' ? (
        data?.images.find((image) => image.select) ? (
          <InformationBox
            image={data.images.find((image) => image.idx === data.selectImage![1] && image.internal === data.selectImage![0])!}
          />
        ) : null
      ) : myImageList?.length! > 0 ? (
        <CompareList myImageList={myImageList} />
      ) : null}
      {methane ? <ESGLegend /> : null}
    </React.Fragment>
  );
}

export default React.memo(Mapbox);
