import { Dispatch, RefObject } from 'react';
import { SearchMenu } from '../types';

/**
 * disables full screen search results dropDown
 * @param searchInner
 * @param searchHeader
 */
export const disableFullScreenSearch = (
  searchInner: RefObject<HTMLDivElement>,
  searchHeader: RefObject<HTMLDivElement>
) => {
  searchInner.current?.classList.add('searchInner');
  searchHeader.current?.classList.remove('searchHeader_full');
  searchInner.current?.classList.remove('searchInner_full');
};

/**
 * closes fullscreen search results dropdown menu , disables full screen search results layout
 * @param searchInner div element
 * @param searchHeader div element
 */
export const closeSearch = (
  searchInner: RefObject<HTMLDivElement>,
  searchHeader: RefObject<HTMLDivElement>,
  setSearchMenu: Dispatch<React.SetStateAction<SearchMenu>>
) => {
  disableFullScreenSearch(searchInner, searchHeader);
  setSearchMenu({ fullScreen: false, compact: false, toggle: false });
};

export const handleSearchLayout = (
  searchInner: RefObject<HTMLDivElement>,
  searchHeader: RefObject<HTMLDivElement>,
  setSearchMenu: Dispatch<React.SetStateAction<SearchMenu>>,
  searchMenuToggle: boolean
) => {
  if (window.innerWidth <= 800 && searchMenuToggle) {
    searchHeader.current?.classList.add('searchHeader_full');
    searchInner.current?.classList.add('searchInner_full');
    searchInner.current?.classList.remove('searchInner');
    setSearchMenu({
      compact: false,
      fullScreen: true,
      toggle: searchMenuToggle,
    });
  } else if (window.innerWidth > 800 && searchMenuToggle) {
    setSearchMenu({
      compact: true,
      fullScreen: false,
      toggle: searchMenuToggle,
    });
    disableFullScreenSearch(searchInner, searchHeader);
  } else {
    disableFullScreenSearch(searchInner, searchHeader);
  }
};
