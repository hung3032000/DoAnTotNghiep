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
import Modal from 'components/web/modal/modal';
import SizeProduct from 'components/web/sizeProduct';
import Detailproduct from 'components/web/detailProduct';
import Colorproduct from 'components/web/colorProduct';
import { getListSize } from 'components/web/product/ProductListSlice';
import { Helmet } from 'react-helmet';

function ProductInfo() {
  const dispatch = useDispatch();
  const actionAddToCart = (cart) => dispatch(addToCart(cart));
  const {
    params: { productId },
  } = useRouteMatch();
  const product = useSelector((state) => state.product.product);
  const size = useSelector((state) => state.productList.size);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('Chọn màu');
  const [sizes, setSize] = useState();
  const [totalProductState, setTotalProductState] = useState();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getProductDetail(productId);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const getListSizeAPI = getListSize();
        const resultActiongetListSizeAPI = await dispatch(getListSizeAPI);
        unwrapResult(resultActiongetListSizeAPI);
      } catch (error) {
        console.log('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, productId]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let allProduct = 0;
        if (color === 'Chọn màu' && sizes === undefined) {
          for (let index = 0; index < size.length; index++) {
            const element = size[index];
            for (let index = 0; index < element.colors.length; index++) {
              const element2 = element.colors[index];
              allProduct += element2.quantity;
            }
          }
          setTotalProductState(allProduct);
        } else if (color !== 'Chọn màu' && sizes !== undefined) {
          size.forEach((i) => {
            if (sizes === i.nameSize) {
              i.colors.forEach((i2) => {
                if (color === i2.colorName) {
                  allProduct = i2.quantity;
                }
              });
            }
          });
          setTotalProductState(allProduct);
        }
      } catch (error) {
        console.log('Failed to fetch product', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [size, color, sizes]);

  const thumnailUrl = product.images ? product.images : THUMNAIL_URL_PRODUCTINFO;

  let a = 0;
  const priceTotal = () => {
    if (product.saleId) {
      a = product.price - (product.price*product.saleId.percentSale/100) ;
    } else {
      a = product.price;
    }
    return a;
  };
  console.log(a);
  const handleSubmit = (data) => {
    setColor(data);
  };
  const handleSubmitSize = (data) => {
    setSize(data);
  };
 
  const handleAddToCartSubmit = (values) => {
    try {
      setLoading(true);
      if (values) {
        const dataCart = {
          color: color,
          size: sizes,
          product,
          price : priceTotal(),
          quantity: 1,
        };
        actionAddToCart(dataCart);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Loader showLoader={loading} />
      <Helmet>
        <title>Thông tin sản phẩm</title>
      </Helmet>
      <div id="wrapper" className="pt_product-details">
        <main id="main" role="main" className="full-width clearfix">
          <div id="primary" className="primary-content">
            <div className="container" id="product-container">
              <div className="row">
                <div className="product-col-image col-sm-6">
                  <section className="product-image-container" aria-roledescription="carousel">
                    <img className="img-productinfo" src={thumnailUrl} alt="Homie Schematics oversized T-shirt" />
                  </section>
                </div>
                <div className="product-col-details col-md-4 col-md-offset-1 col-sm-6">
                  <div className="product-detail">
                    <div className="product-label">{product.saleId ? 'Sale' : product.content}</div>
                    <div>
                      <h1 className="product-name">{product.name}</h1>
                      <div className="product-price">
                        {product.saleId ? (
                          <>
                            <span className="price-standard">{formatPrice(product.price)}</span>
                            <span className="money-saved"> ({product.saleId.percentSale}%) </span>
                            <span className="price-sales"> {formatPrice(priceTotal())} </span>
                          </>
                        ) : (
                          <span className="price-sales"> {formatPrice(priceTotal())}  </span>
                        )}
                      </div>

                      <div className="product-description">
                        <div className="double-form-button">
                          <div className="left">
                            <Modal classNameModal={'form-button secondary'} label={'Thông tin món hàng'}>
                              <Detailproduct />
                            </Modal>
                          </div>
                          <div className="right">
                            <div className="form-button secondary addtowhishlist-btn">
                              <a href className="add-to-wishlist">
                                <span className="visible-xs-block">{totalProductState} sản phẩm</span>
                                <span className="hidden-xs">{totalProductState} sản phẩm</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Colorproduct color={size} onSubmit={handleSubmit} />
                      <SizeProduct size={size} onSubmit={handleSubmitSize} color={color} />
                      <div className="product-add-to-cart">
                        <AddToCart onSubmit={handleAddToCartSubmit} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-block-images container">
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
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductInfo;
