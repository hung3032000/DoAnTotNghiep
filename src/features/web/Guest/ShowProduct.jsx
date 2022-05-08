import { unwrapResult } from '@reduxjs/toolkit';
import { categoryCDetail } from 'components/web/category/CategoryChildSlice';
import { getListProduct } from 'components/web/product/ProductListSlice';
import ProductsList from 'components/web/product/ProductsList';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Loader from 'components/fullPageLoading';
import Modal from 'components/web/modal/modal';

const ShowProduct = function () {
  const {
    params: { catechildId },
  } = useRouteMatch();
  const dispatch = useDispatch();
  // list Product
  const dataProductsList = useSelector((state) => state.productList.data);
  const totalProductsList = useSelector((state) => state.productList.length);
  const dataCategoryCDetail = useSelector((state) => state.categoryChildList.categoryChildDetail);
  const [loading, setLoading] = useState(false);

  //useEffect
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getListProduct({
          page: 1,
          limit: 9,
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

  return (
    <div>
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
                    <h1 className="title-filter">{totalProductsList} Sản phẩm</h1>
                  </div>
                  <div className="refine-buttons col-md-6 col-md-4 order-md-3">
                    <div className="filters-tabs">
                    <Modal classNameModal={'btn btn-link filters-tab'} label={"Filters"}>

                    </Modal>
                      {/* <button className="btn btn-link filters-tab" type="button" aria-expanded="false" aria-controls="filters">
                        <span className="label">Filters</span>
                        <span className="label-count"></span>
                      </button> */}
                      <a href className="reset-refinements btn btn-link-secondary d-none">
                        Clear all
                      </a>
                    </div>
                  </div>
                  <div className="col-md-12 col-md-4 order-md-2"></div>
              </div>

              <ul className="search-result-items tiles-container js-slv-product-grid row" data-columns>
                <ProductsList data={dataProductsList} />
              </ul>
              
              <div className="centered">
                <ul className="pagination cursor">
                  <li className="page-item">
                    <a className="page-link" href>
                      Trước
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href>
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href>
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href>
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href>
                      Sau
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowProduct;
