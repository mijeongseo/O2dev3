import React, { useEffect, useState } from 'react';
import Header from '@components/Header';
import Sidebar from './Sidebar';
import Mapbox from './Mapbox';

function MapLayout() {
  const [preview, onSetPreview] = useState('');
  const [sidebarSelect, setSidebarSelect] = useState('FINDER');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  });

  return (
    <>
      {loaded && <Header value="MAP" />}
      {loaded && <Sidebar onSetPreview={onSetPreview} sidebarSelect={sidebarSelect} onSidebarSelect={setSidebarSelect} />}
      {loaded && <Mapbox preview={preview} sidebarSelect={sidebarSelect} />}
    </>
  );
}

export default React.memo(MapLayout);
