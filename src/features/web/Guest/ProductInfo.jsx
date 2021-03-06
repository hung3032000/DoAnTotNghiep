/* eslint-disable react-hooks/exhaustive-deps */
import AddToCart from 'components/web/cart/AddToCart';
import { addToCart } from 'slice/CartSlice';
import { THUMNAIL_URL_PRODUCTINFO } from 'constants/index';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router';
import { formatPrice } from 'utils/common';
import Loader from 'components/fullPageLoading';
import { getProductDetail, getRecommand } from 'slice/ProductSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Modal from 'components/web/modal/modal';
import SizeProduct from 'components/web/sizeProduct';
import Detailproduct from 'components/web/detailProduct';
import Colorproduct from 'components/web/colorProduct';
import { getListSize } from 'slice/ProductListSlice';
import { Helmet } from 'react-helmet';
import Suggestions from 'components/web/suggestions';
import { useSnackbar } from 'notistack';
function ProductInfo() {
  const dispatch = useDispatch();
  const actionAddToCart = (cart) => dispatch(addToCart(cart));
  const {
    params: { productId },
  } = useRouteMatch();
  const { enqueueSnackbar } = useSnackbar();

  const product = useSelector((state) => state.product.product);
  const recommend = useSelector((state) => state.product.recommend);
  const userGender = useSelector((state) => state.user.current.gender);
  const size = useSelector((state) => state.productList.size);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('Chọn màu');
  const [sizes, setSize] = useState('');
  const [totalProductState, setTotalProductState] = useState();
  const [up, setUp] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getProductDetail(productId);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        const getListSizeAPI = getListSize(productId);
        const resultActiongetListSizeAPI = await dispatch(getListSizeAPI);
        unwrapResult(resultActiongetListSizeAPI);
      } catch (error) {
        console.log('Failed to fetch product', error);
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, productId]);
  useEffect(() => {
    (async () => {
      const values = {
        age: 18 + Math.floor(Math.random() * (65 - 18)),
        gender: userGender ? userGender : 'Female',
        previousProduct: parseInt(productId),
        price: product.price ? product.price : 100,
        sale: product.saleId ? 'Yes' : 'No',
      };
      try {
        setLoading(true);
        const action = getRecommand(values);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log('Failed to fetch product', error);
        enqueueSnackbar(error.message, { variant: 'error' });
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
        if (color === 'Chọn màu' && sizes.value === undefined) {
          setUp(true);
          for (let index = 0; index < size.length; index++) {
            const element = size[index];
            for (let index = 0; index < element.colors.length; index++) {
              const element2 = element.colors[index];
              allProduct += element2.quantity;
            }
          }
          setTotalProductState(allProduct);
        } else if (color !== 'Chọn màu' && sizes.value !== undefined) {
          setUp(false);
          size.forEach((i) => {
            if (sizes.value === i.nameSize) {
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
        enqueueSnackbar(error.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    })();
  }, [size, color, sizes.value]);
  const thumnailUrl = product.imageMain ? product.imageMain : THUMNAIL_URL_PRODUCTINFO;
  let priceProductTotal = 0;
  const priceTotal = () => {
    if (product.saleId) {
      priceProductTotal = product.price - (product.price * product.saleId.percentSale) / 100;
    } else {
      priceProductTotal = product.price;
    }
    return priceProductTotal;
  };
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
          size: sizes.value,
          sizeId: sizes._id,
          product,
          price: priceTotal(),
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
                          <span className="price-sales"> {formatPrice(priceTotal())} </span>
                        )}
                      </div>

                      <div className="product-description">
                        <div className="double-form-button">
                          <div className="left">
                            <Modal classNameModal={'form-button secondary'} label={'Thông tin món hàng'}>
                              <Detailproduct product={product} color={size} />
                            </Modal>
                          </div>
                          <div className="right">
                            <div className="form-button secondary addtowhishlist-btn">
                              <a href>
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
                        <AddToCart onSubmit={handleAddToCartSubmit} soldOut={totalProductState === 0 || up ? true : false} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-block-images container">
                {product.images?.map((productList, index) => (
                  <a key={index} href className="fullscreen full-mobile">
                    <img className="img-productinfo" src={productList} alt="Lỗi ảnh" />
                  </a>
                ))}
              </div>
              <Suggestions currentTableData={recommend.prediction} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductInfo;
