/* eslint-disable react-hooks/exhaustive-deps */
import { unwrapResult } from '@reduxjs/toolkit';
import ProductsList from 'components/web/product/ProductsList';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/fullPageLoading';
import { Helmet } from 'react-helmet';
import Pagination from 'components/web/pagination/index';
import { useLocation } from 'react-router';
import { getSearchByWord } from 'slice/SearchSlice';
import { useSnackbar } from 'notistack';

let PageSize = 8;
const Search = function () {
  let location = useLocation();
  const searchFor = location.search.substring(3);
  const dispatch = useDispatch();
  // list Product
  const dataProductsList = useSelector((state) => state.search.dataSearch);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { enqueueSnackbar } = useSnackbar();

  //useEffect
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getSearchByWord({ stringSearch: searchFor });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, searchFor]);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataProductsList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataProductsList]);
  return (
    <div>
      <Helmet>
        <title>Tìm Kiếm</title>
      </Helmet>
      <Loader showLoader={loading} />
      <main id="main" className="clearfix" style={{ marginTop: '128px' }}>
        <div className="content-slot slot-grid-header" />
        <div id="primary" className="primary-content">
          <div className="container">
            <div className="category-box">
              <div className="row-title">
                <div className="col-md-6 col-md-4">
                  <h1 className="title-filter">
                    {currentTableData.length} Sản phẩm cho {searchFor}
                  </h1>
                </div>
                <div className="col-md-12 col-md-4 order-md-2"></div>
              </div>

              <ul className="search-result-items tiles-container js-slv-product-grid row" data-columns>
                <ProductsList data={currentTableData} />
              </ul>
              <Pagination
                className="pagination cursor"
                currentPage={currentPage}
                totalCount={dataProductsList.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
