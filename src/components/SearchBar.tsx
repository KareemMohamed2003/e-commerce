import { useCallback, useEffect, useRef, useState } from 'react';
import { searchProduct } from '../lib/helpers';
import { Form } from 'react-router-dom';
import Spinner from './svg-components/Spinner';
import SearchIcon from './svg-components/SearchIcon';
import styles from '../sass/searchBar.module.scss';
import { SearchBarProps } from '../types';

export default function SearchBar({
  products,
  setSearchResults,
  setSearchMenu,
  searchResults,
}: SearchBarProps) {
  const input = useRef<HTMLInputElement>(null);
  const [isSearching, setSearching] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      !keyword && setSearching(false);
      if (keyword) {
        const results = searchProduct(keyword, products);
        setSearchResults(results);
        setSearching(false);
        setSearchMenu((prev) => {
          return { ...prev, toggle: true };
        });
      }
    }, 1000);
    if (!input.current?.value) {
      setSearchMenu({ fullScreen: false, compact: false, toggle: false });
      setSearchResults(null);
    }
    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value && setSearching(true);
      setKeyword(e.target.value);
    },
    [keyword]
  );

  return (
    <div className={styles.searchWrapper}>
      <Form id={styles.form} action="/home/search" role="search">
        <input
          disabled={products ? false : true}
          ref={input}
          name="product"
          type="search"
          placeholder="search..."
          onChange={handleInputChange}
          onFocus={() =>
            searchResults &&
            setSearchMenu((prev) => {
              return { ...prev, toggle: true };
            })
          }
        />
        <button className={styles.searchBtn} type="submit">
          {isSearching ? (
            <Spinner />
          ) : (
            <div id={styles.searchIcon}>
              <SearchIcon />
            </div>
          )}
        </button>
      </Form>
    </div>
  );
}
