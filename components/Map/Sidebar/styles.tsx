import styled from 'styled-components';

export const SidebarDiv = styled.div<{ height: string; width: string }>`
  position: absolute;
  top: ${(props) => props.height};
  left: 0;
  height: calc(100vh - ${(props) => props.height});
  width: ${(props) => props.width};

  background: white;
`;

export const SidebarHeaderDiv = styled.div`
  width: 100%;
  height: 48px;
  background: #f8f8f8;
  padding: 0 24px;
  display: flex;
  justify-content: space-around;
  align-content: center;
  align-items: center;
`;

export const SidebarHeaderMenu = styled.div`
  user-select: none;
  
  cursor: pointer;
  font-family: NanumSquareRound;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;

  color: rgba(0, 0, 0, 0.7);

  &.unselect {
    opacity: 0.3;
  }

  &.disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const SidebarContentDiv = styled.div`
  padding: 12px;
  height: 100%;

  &.block {
    display: block;
  }

  &.none {
    display: none;
  }
  
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;