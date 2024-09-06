import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { handleSearchLayout, closeSearch } from '../lib/searchActions';
import { SearchProps } from '../types';

export default function Search({
  setSearchMenu,
  searchMenu,
  productsArr,
  setSearchResults,
  searchResults,
}: SearchProps) {
  const searchHeader = useRef<HTMLDivElement>(null);
  const searchInner = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
    return () => window.removeEventListener('resize', () => {});
  }, []);

  useEffect(() => {
    handleSearchLayout(
      searchInner,
      searchHeader,
      setSearchMenu,
      searchMenu.toggle
    );
  }, [viewportSize, searchResults, searchMenu.toggle]);

  return (
    <div className={`searchHeader`} ref={searchHeader}>
      <div className={`searchInner`} ref={searchInner}></div>
      <SearchBar
        setSearchMenu={setSearchMenu}
        products={productsArr}
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
      <button
        ref={closeBtn}
        hidden={searchMenu.fullScreen ? false : true}
        onClick={() => closeSearch(searchInner, searchHeader, setSearchMenu)}
        className="searchExitBtn"
      >
        close{' '}
      </button>

      {searchMenu.toggle && <SearchResults results={searchResults!} />}
      {}
    </div>
  );
}
