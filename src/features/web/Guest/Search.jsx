import { unwrapResult } from '@reduxjs/toolkit';
import { categoryCDetail } from 'slice/CategoryChildSlice';
import { getListProduct } from 'slice/ProductListSlice';
import ProductsList from 'components/web/product/ProductsList';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'components/fullPageLoading';
import Modal from 'components/web/modal/modal';
import { Helmet } from 'react-helmet';
import Pagination from 'components/web/pagination/index';
import { useLocation } from 'react-router';

let PageSize = 8;
const ShowProduct = function () {
  let location = useLocation();
  console.log(location.search.substring(3));
  const searchFor = location.search.substring(3);
  const dispatch = useDispatch();
  // list Product
  const dataProductsList = useSelector((state) => state.productList.data);
  const dataCategoryCDetail = useSelector((state) => state.categoryChildList.categoryChildDetail);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataProductsList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataProductsList]);

  //useEffect
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getListProduct({
          page: 1,
          limit: 10000,
          subcategoryId: 25,
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const actionChild = categoryCDetail(25, { substatus: true });
        const resultActionChild = await dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return (
    <div>
      <Helmet>
        <title>Tìm Kiếm</title>
      </Helmet>
      <Loader showLoader={loading} />
      <main id="main" className="clearfix" style={{ marginTop: '128px' }}>
        <div className="content-slot slot-grid-header" />
        <div id="primary" className="primary-content">
          <div className="page-header">
            <h1>
              <span className="title">{dataCategoryCDetail.namesubCategory}</span>
            </h1>
          </div>

          <div className="container">
            <div className="category-box">
              <div className="row-title">
                <div className="col-md-6 col-md-4">
                  <h1 className="title-filter">
                    {currentTableData.length} Sản phẩm cho {searchFor}
                  </h1>
                </div>
                <div className="refine-buttons col-md-6 col-md-4 order-md-3">
                  <div className="filters-tabs">
                    <Modal classNameModal={'btn btn-link filters-tab'} label={'Filters'}></Modal>

                    <a href className="reset-refinements btn btn-link-secondary d-none">
                      Clear all
                    </a>
                  </div>
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

export default ShowProduct;
