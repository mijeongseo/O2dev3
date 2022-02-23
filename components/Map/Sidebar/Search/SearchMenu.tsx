import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { SearchMenuContent, SearchMenuDiv, SearchMenuHeader } from './styles';

type SearchMenuProps = {
    title: string;
    imgSrc: string;
    hideFunc?: boolean;
    children?: React.ReactNode;
}

function SearchMenu ({ title, imgSrc, hideFunc, children }: SearchMenuProps) {

  const onClickHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.currentTarget.nextElementSibling!.classList.contains('hidden')) {
      e.currentTarget.nextElementSibling!.classList.remove('hidden');
    }
    else {
      e.currentTarget.nextElementSibling!.classList.add('hidden');
    }
  }

  return (
    <SearchMenuDiv>
      {
        hideFunc ? 
          <SearchMenuHeader onClick={onClickHandler} hover={true}>
            <img src={imgSrc} alt="" /> {title}
            <RiArrowDownSLine />
          </SearchMenuHeader>
        :
          <SearchMenuHeader>
            <img src={imgSrc} alt="" /> {title}
          </SearchMenuHeader>
      }
      <SearchMenuContent>
        {children}
      </SearchMenuContent>
    </SearchMenuDiv>
  );
}

export default React.memo(SearchMenu)
