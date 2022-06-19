import { unwrapResult } from '@reduxjs/toolkit';
import { categoryCDetail } from 'slice/CategoryChildSlice';
import { getListProduct } from 'slice/ProductListSlice';
import ProductsList from 'components/web/product/ProductsList';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Loader from 'components/fullPageLoading';
import Modal from 'components/web/modal/modal';
import { Helmet } from 'react-helmet';
import Pagination from 'components/web/pagination/index';
import Filter from 'components/web/filter';
let PageSize = 8;
const ShowProduct = function () {
  const {
    params: { catechildId },
  } = useRouteMatch();
  const dispatch = useDispatch();
  // list Product
  const dataProductsList = useSelector((state) => state.productList.data);
  const dataCategoryCDetail = useSelector((state) => state.categoryChildList.categoryChildDetail);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState('');

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (data !== '' ? data : dataProductsList).slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data, dataProductsList]);
  console.log(currentTableData);
  //useEffect
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getListProduct({
          page: 1,
          limit: 10000,
          subcategoryId: catechildId,
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const actionChild = categoryCDetail(catechildId, { substatus: true });
        const resultActionChild = await dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [catechildId, dispatch]);
  useEffect(() => {
    setData(dataProductsList);
  }, [dataProductsList]);

  return (
    <div>
      <Helmet>
        <title>Sản phẩm</title>
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
                  <h1 className="title-filter">{currentTableData.length} Sản phẩm</h1>
                </div>
                <div className="refine-buttons col-md-6 col-md-4 order-md-3">
                  <div className="filters-tabs">
                    <Modal classNameModal={'btn btn-link filters-tab'} label={'Filters'}>
                      <Filter data={data} setData={setData} productList={dataProductsList}/>
                    </Modal>
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
                totalCount={data.length}
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
