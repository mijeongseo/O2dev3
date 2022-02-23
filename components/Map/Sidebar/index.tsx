import { LAYOUT_PROPS } from 'props';
import React, { useState, useCallback } from 'react';
import Search from './Search';
import Mypage from './Mypage';
import SidebarHeader from './SidebarHeader';
import { SidebarDiv } from './styles';
import ResultList from './ResultList';
import { useSelector } from 'react-redux';
import { RootState } from 'store/modules';
import Login from '@components/Login';

type SidebarProps = {
  sidebarSelect: string;
  onSidebarSelect: (id: string) => void;
  onSetPreview: (id: string) => void;
};

function Sidebar({ sidebarSelect, onSidebarSelect, onSetPreview }: SidebarProps) {
  
  const result = useSelector((state: RootState) => state.searchResult.imageList.data?.result);
  const [popup, setPopup] = useState(false);
  const onPopup = useCallback(() => {
    setPopup((prev) => !prev);
  }, []);

  return (
    <>
      <SidebarDiv height={LAYOUT_PROPS.h_height} width={LAYOUT_PROPS.s_width}>
        <SidebarHeader select={sidebarSelect} onSetSelect={onSidebarSelect} />
        <Search select={sidebarSelect}>
          {result && <ResultList onSetPreview={onSetPreview} />}
        </Search>
        <Mypage select={sidebarSelect} onPopup={onPopup} />
      </SidebarDiv>
      {popup && <Login onPopup={onPopup} />}
    </>
  );
}

export default React.memo(Sidebar);
