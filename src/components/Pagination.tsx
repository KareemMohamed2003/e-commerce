import { Fragment, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../sass/searchPage.module.scss';
import { generatePages, getPagesCut, paginateProducts } from '../lib/helpers';
import { PaginationProps } from '../types';
export default function Pagination({
  productParam,
  totalPages,
  currentPage,
  setPaginatedResults,
  searchResults,
}: PaginationProps) {
  const [pages, setPages] = useState<number[]>([]); // pages should be the pages generated
  const [page, setPage] = useState<number>(currentPage);
  const pageParam = Number(
    new URL(window.location.href).searchParams.get('page')
  );
  useEffect(() => {
    const pagesIndex = getPagesCut(
      pageParam ? pageParam : currentPage,
      totalPages,
      pages.length
    );
    const generatedPages = generatePages(pagesIndex!.start, pagesIndex!.end);
    setPages(generatedPages);
    setPage(pageParam);
  }, [pageParam]);

  return (
    <Fragment>
      {pages.length > 0 && (
        <section className={styles.pagination}>
          {page > 1 && page <= totalPages && (
            <NavLink
              reloadDocument
              to={`/home/search?product=${productParam}&page=${page - 1}`}
              className={styles.paginationBtn}
              onClick={() => {}}
            >
              <h2>prev</h2>
            </NavLink>
          )}
          {page >= 4 && (
            <NavLink
              reloadDocument
              key={Math.random() * 1000}
              to={`/home/search?product=${productParam}&page=${page}`}
              className={styles.pageLink}
              onClick={() =>
                setPaginatedResults(
                  paginateProducts(searchResults!, page) as []
                )
              }
            >
              <span>first</span>
            </NavLink>
          )}
          {page >= 4 && <span>...</span>}
          <div>
            {pages.map((page, index) => {
              return (
                <NavLink
                  reloadDocument
                  key={index}
                  to={`/home/search?product=${productParam}&page=${page}`}
                  className={styles.pageLink}
                  onClick={() =>
                    setPaginatedResults(
                      paginateProducts(searchResults!, page) as []
                    )
                  }
                >
                  <span>{page}</span>
                </NavLink>
              );
            })}
          </div>
          {page < totalPages && (
            <NavLink
              to={`/home/search?product=${productParam}&page=${page + 1}`}
              reloadDocument
              className={styles.paginationBtn}
              onClick={() => {
                setPaginatedResults(
                  paginateProducts(searchResults!, page + 1) as []
                );
              }}
            >
              <h2>next</h2>
            </NavLink>
          )}
        </section>
      )}
    </Fragment>
  );
}
