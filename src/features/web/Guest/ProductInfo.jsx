import AddToCart from 'components/web/cart/AddToCart';
import { addToCart } from 'components/web/cart/CartSlice';
import { THUMNAIL_URL_PRODUCTINFO } from 'constants/index';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { formatPrice } from 'utils/common';
import Loader from 'components/fullPageLoading';
import { getProductDetail } from 'components/web/product/ProductSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function ProductInfo() {
  const dispatch = useDispatch();
  const actionAddToCart = (cart) => dispatch(addToCart(cart));
  const {
    params: { productId },
  } = useRouteMatch();
  const [click, setClick] = useState(false);
  const product = useSelector((state) => state.product.product);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const action = getProductDetail(productId);
        const resultAction = await dispatch(action);
        console.log(resultAction);
        unwrapResult(resultAction);
      } catch (error) {
        console.log('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, productId]);

  const thumnailUrl = product.images ? product.images : THUMNAIL_URL_PRODUCTINFO;
  const handleAddToCartSubmit = (values) => {
    try {
      if (values) {
        const dataCart = {
          product,
          quantity: 1,
        };
        actionAddToCart(dataCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Loader showLoader={loading} />

      <div id="wrapper" className="pt_product-details">
        <main id="main" role="main" className="full-width clearfix" style={{ marginTop: '128px' }}>
          <div id="primary" className="primary-content">
            <div className="container" id="product-container">
              <div className="row">
                <div className="product-col-image col-sm-6">
                  <section className="product-image-container" aria-roledescription="carousel">
                    <img className="img-productinfo" itemProp="image" src={thumnailUrl} alt="Homie Schematics oversized T-shirt" />
                  </section>
                </div>
                <div className="product-col-details col-md-4 col-md-offset-1 col-sm-6">
                  <div className="product-detail">
                    <div className="product-label">{product.content}</div>
                    <div id="product-content" className="not-downgraded">
                      <h1 className="product-name" itemProp="name">
                        {product.name}
                      </h1>
                      <div className="product-price">
                        <span className="price-standard">{formatPrice(product.price)}</span>

                        {/* {product.promotionPercent > 0 && ( */}
                        <>
                          <span className="money-saved"> (-50&nbsp;%) </span>

                          <span className="price-sales"> {formatPrice(product.price)} </span>
                        </>
                        {/* )} */}
                      </div>

                      <div className={`product-description ${click ? 'open' : ' '}`}>
                        <div className="double-form-button">
                          <div className="left">
                            <button
                              className="form-button secondary moredetails-btn"
                              id="more-details"
                              aria-controls="description-tab"
                              aria-expanded="false"
                              onClick={() => setClick(true)}
                            >
                              <h2>Chi tiết</h2>
                              <i className="icon_PlusS" />
                            </button>
                            <button
                              className="form-button secondary moredetails-btn"
                              id="less-details"
                              aria-controls="description-tab"
                              aria-expanded="false"
                              onClick={() => setClick(false)}
                            >
                              <h2>Rút gọn</h2>
                              <i className="icon_MinusS" />
                            </button>
                          </div>
                          <div className="right hidden-xs">
                            <div className="form-button secondary addtowhishlist-btn">
                              <a href data-pname="Homie Schematics oversized T-shirt" data-pid="BM710P3002-055" className="add-to-wishlist ">
                                <span className="visible-xs-block">Add to wishlist</span> <span className="hidden-xs">Wishlist</span>
                                <span className="heart-icon">
                                  <i className="icon_Wishlist" /> <i className="icon_Wishlist_Active" />
                                </span>
                                <span className="visually-hidden">Add to your wishlist Homie Schematics oversized T-shirt</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div id="description-tab" className="long-description">
                          <div className="short-description">{product.description}</div>
                          <p className="sku">
                            Mã sản phẩm:
                            <span className="pid" itemProp="sku">
                              {product._id}
                            </span>
                          </p>
                          <p>Chất liệu: {product.material}.</p>
                          <div className="product-description-subtitle">Khác</div>
                          <p>Nguồn gốc: {product.orgin}.</p>
                        </div>
                      </div>
                      <div className="product-add-to-cart">
                        {/* <div className="inventory">
                          <input type="hidden" name="pid" id="pid" defaultValue="BM710P3002-055" />
                          <div className="quantity">
                            <input type="hidden" name="Quantity" id="Quantity" defaultValue={1} />
                          </div>
                        </div>
                        <input type="hidden" name="uuid" id="uuid" defaultValue /> 
                        <input type="hidden" name="cartAction" id="cartAction" defaultValue="update" /> */}
                        {/* <div id="product-variations" className="product-variations" tabIndex={-1}>
                          <h2 className="visually-hidden">Other options</h2>
                          <div className="tab-headers">
                            <button id="variation-Size-header" data-target="#variation-Size" className="tab-header" aria-expanded="false" aria-controls="variation-Size">
                              <h2>Size</h2>
                              <i className="icon_DownL" />
                            </button>
                          </div>
                          <div className="tab-content">
                            <div className="tab-pane" id="variation-Size">
                              <section className="attribute variation-swiper-container" aria-roledescription="carousel">
                                <div className="swiper-button-next" />
                                <div className="swiper-button-prev" />
                                <div className="value swiper-container swiper-container-horizontal">
                                  <div className="swiper-wrapper">
                                    <div className="selectable attrvalue swiper-slide" aria-roledescription="slide" style={{ width: '79.25px', marginRight: '12px' }}>
                                      <a
                                        className="swatchanchor"
                                        href="/#"
                                        data-lgimg='{"url":"/on/demandware.static/Sites-GIV_US-Site/-/en/v1610125434859/images/noimage-product-detail.png","title":"Homie faded t-shirt ","alt":"Homie faded t-shirt ","hires":"/on/demandware.static/Sites-GIV_US-Site/-/en/v1610125434859/images/noimage-product-zoom.png"}"}'
                                        aria-label="Select Size: 4XL"
                                      >
                                        <span className title="Select Size: 4XL">
                                          4XL
                                        </span>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="swiper-pagination" />
                              </section>
                              <span className="size-guide" role="button" tabIndex={0} data-aid="SizeGuide_M_T-shirt">
                                Link to size guide
                              </span>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="error-message">
                          <i className="icon_Warning" /> <span>Please select a size</span>
                        </div> */}
                        <AddToCart onSubmit={handleAddToCartSubmit} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-block-images container">
                {/* <c:foreach var="image" items="${image.listResult}"> */}
                <a href className="fullscreen full-mobile">
                  <img className="img-productinfo" src={thumnailUrl} alt="Lỗi ảnh" />
                </a>
                <a href className="fullscreen full-mobile">
                  <img className="img-productinfo" src={thumnailUrl} alt="Lỗi ảnh" />
                </a>
                <a href className="fullscreen full-mobile">
                  <img className="img-productinfo" src={thumnailUrl} alt="Lỗi ảnh" />
                </a>
                <a href className="fullscreen full-mobile">
                  <img className="img-productinfo" src={thumnailUrl} alt="Lỗi ảnh" />
                </a>
                {/* </c:foreach> */}
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* end body */}
    </div>
  );
}

export default ProductInfo;
