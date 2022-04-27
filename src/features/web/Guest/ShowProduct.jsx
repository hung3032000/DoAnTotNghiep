import { unwrapResult } from '@reduxjs/toolkit';
import { categoryCDetail } from 'components/web/category/CategoryChildSlice';
import { getListProduct } from 'components/web/product/ProductListSlice';
import ProductsList from 'components/web/product/ProductsList';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import Loader from 'components/fullPageLoading';

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
          <div className="search-results-container">
            <div className="refinements">
              <h2 className="visually-hidden">Refine Your Results By:</h2>
              <div className="refinements-tabs">
                <div className="filters-tabs" id="filters-tabs">
                  <div className="container">
                    <a
                      href="/#"
                      className="filter-link"
                      role="button"
                      data-filter-name="Category"
                      data-filter-name-active="Category (Active filter)"
                      data-filter-id={1}
                      title="Refine Your Results By: Category"
                      aria-expanded="false"
                      aria-controls="filter-Category"
                    >
                      <span>Danh mục</span>
                    </a>
                    <a
                      href="/#"
                      className="filter-link sort-by"
                      role="button"
                      data-filter-name="Sort by"
                      data-filter-name-active="Sort by (Active filter)"
                      data-filter-id={98}
                      title="Sort by"
                      aria-expanded="false"
                      aria-controls="filter-sort-by"
                    >
                      <span>Sắp xếp theo</span>
                    </a>
                    <a
                      href="/#"
                      className="filter-link"
                      id="filter-link"
                      role="button"
                      data-filter-name="Filters"
                      data-filter-name-active="Filters (Active filter)"
                      aria-expanded="false"
                      aria-controls="filter-tag"
                    >
                      <span>Lọc</span>
                    </a>
                    {/* <span className="swiper-slide">
                        
                        <span> Filters </span>
                      </span> */}
                    <a
                      href="/#"
                      className="swiper-slide"
                      role="button"
                      data-filter-name="Color"
                      data-filter-name-active="Color (Active filter)"
                      data-filter-id={2}
                      title="Refine Your Results By: Color"
                      aria-expanded="false"
                      aria-controls="filter-Color"
                    >
                      <span>Màu</span>
                    </a>
                    <a
                      href="/#"
                      className="swiper-slide"
                      role="button"
                      data-filter-name="Size"
                      data-filter-name-active="Size (Active filter)"
                      data-filter-id={3}
                      title="Refine Your Results By: Size"
                      aria-expanded="false"
                      aria-controls="filter-Size"
                    >
                      <span>Kích cỡ</span>
                    </a>
                    <a
                      href="/#"
                      className="swiper-slide"
                      role="button"
                      data-filter-name="Season"
                      data-filter-name-active="Season (Active filter)"
                      data-filter-id={4}
                      title="Refine Your Results By: Season"
                      aria-expanded="false"
                      aria-controls="filter-Season"
                    >
                      <span>Season</span>
                    </a>
                    <a
                      href="/#"
                      className="swiper-slide same-day-link"
                      role="button"
                      data-filter-id={101}
                      data-filter-name="Same Day Delivery"
                      data-filter-name-active="Same Day Delivery (Active filter)"
                      title="Same Day Delivery"
                      aria-expanded="false"
                      aria-controls="filter-same-day"
                    >
                      <span>Giao hàng trong ngày</span>
                    </a>
                    {/* <a
                      href="/#"
                      className="swiper-slide browse-by-store-link"
                      role="button"
                      data-filter-id={99}
                      data-filter-name="Browse by store"
                      data-filter-name-active="Browse by store (Active filter)"
                      title="Browse by store"
                      aria-expanded="false"
                      aria-controls="filter-browse-by-store"
                    >
                      <span>Browse by store</span>
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="filters-overlay" />
          <div className="container">
            <div className="category-box">
              <div className="search-result-content productgrid">
                <div className="inf-scroll-products">
                  <p>{totalProductsList} Sản phẩm</p>
                </div>
                <div className="productListInfos hidden" />
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
