import { Divider } from 'antd';
import { SIDEBAR_HEADER_MENU } from 'props';
import React from 'react';
import { SidebarHeaderDiv, SidebarHeaderMenu } from './styles';

type SidebarHeaderProps = {
  select: string;
  onSetSelect: (select: string) => void;
};

function SidebarHeader({ select, onSetSelect }: SidebarHeaderProps) {

  const onClickHandler = (e: React.MouseEvent) => {
    const clicked = e.currentTarget.textContent!.trim();
    if (select === clicked) {
      return false;
    }
    onSetSelect(clicked);
  }

  return (
    <SidebarHeaderDiv>
      {SIDEBAR_HEADER_MENU.map((menu, index) => {
        return (
          <React.Fragment key={index}>
            <SidebarHeaderMenu className={select === menu[0] ? '' : 'unselect'} onClick={onClickHandler}>
              <img src={menu[1]} alt="" /> &nbsp;
              {menu[0]}
            </SidebarHeaderMenu>
            {index === SIDEBAR_HEADER_MENU.length - 1 ? null : <Divider type="vertical" />}
          </React.Fragment>
        );
      })}
    </SidebarHeaderDiv>
  );
}

export default React.memo(SidebarHeader);