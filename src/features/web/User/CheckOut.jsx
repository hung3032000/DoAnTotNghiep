import { cartTotalSelector } from 'slice/Selectors';
import CheckOutForm from 'components/web/form/CheckOutForm';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import { THUMNAIL_URL_PRODUCTLIST } from 'constants/index';
import { useHistory } from 'react-router-dom';
import { addOrderUser, checkout } from 'slice/OrderSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { emptyCart } from 'slice/CartSlice';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import { useSnackbar } from 'notistack';
const CheckOut = function (props) {
  const history = useHistory();
  const priceFinal = useSelector((state) => state.voucher.data);
  const dataUser = useSelector((state) => state.user.current);
  const dataCart = useSelector((state) => state.cart.dataCart);
  const cartTotal = useSelector(cartTotalSelector);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleCheckOutFormSubmit = async (values) => {
    try {
      setLoading(true);
      values.addressrecevie = {
        name: values.FName,
        phonenumber: values.Phone,
        address: values.Address,
      };
      let item = {
        productId: 1,
        quantity: 2,
        totalPrice: 200,
        saleId: 20,
        sizeId: 20,
        colorName: 'Black',
        sizeName: 'Black',
      };
      let items = [];

      for (let i = 0; i < dataCart.length; i++) {
        item.productId = dataCart[i].product._id;
        item.quantity = dataCart[i].quantity;
        item.totalPrice = dataCart[i].quantity * dataCart[i].product.price;
        if (dataCart[i].product.saleId) {
          item.saleId = dataCart[i].product.saleId._id;
        } else {
          item.saleId = null;
        }
        item.colorName = dataCart[i].color;
        item.sizeName = dataCart[i].size;
        item.sizeId = dataCart[i].sizeId;
        items.unshift(item);
        item = {
          productId: 1,
          quantity: 2,
          totalPrice: 200,
        };
      }
      values.userId = dataUser._id;
      values.items = items;
      values.priceDiscount = priceFinal.DiscountPriceL;
      values.totalPrice = priceFinal.Total ? priceFinal.Total : cartTotal;
      values.isPaypal = false;
      const action = addOrderUser(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      const action2 = checkout();
      dispatch(action2);
      const action3 = emptyCart();
      dispatch(action3);
      enqueueSnackbar('Đặt hàng thành công', { variant: 'success' });

      history.push('/order');
      window.location.reload();
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar('Đặt hàng thất bại', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <Loader showLoader={loading} />
      <main id="main" role="main" className="primary-focus clearfix" style={{ marginTop: '128px' }}>
        <div id="primary" className="primary-content">
          <div className="container">
            <div id="primary" className="primary-content">
              <div className="shipping">
                <div className="page-header">
                  <h1>
                    <span className="title">Đơn hàng của bạn</span>
                  </h1>
                </div>
                <div className="col-sm-6 checkout-area">
                  <h2 className="no-mobile">Tiến hành đặt hàng</h2>
                  <div className="step-area shipping ">
                    <div className="step-title">
                      <div className="step">1</div>
                      <h3>Vận chuyển</h3>
                    </div>
                    <div className="forms-container step-content">
                      <div className="response-container">
                        <CheckOutForm onSubmit={handleCheckOutFormSubmit} />
                        <div className="form-row big-margin-bottom">
                          <div className="content-asset">
                            <p className="terms-conditions">lorem ipsum dolor sit amet, consectetur adip</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="checkout-summary-fixed" className="col-sm-6" style={{ marginTop: '0px' }}>
                <div className="summary">
                  <h2>Tổng kết</h2>
                  <div className="checkout-mini-cart">
                    {dataCart.map((card) => (
                      <div key={card.id} className="line-item">
                        <div className="product-image">
                          <img src={card.product.imageMain ? card.product.imageMain : THUMNAIL_URL_PRODUCTLIST} alt="ProductImage" />
                        </div>
                        <ul className="product-infos datacart-ul">
                          <li className="item-name">
                            <h3>
                              <a href="/#" title={card.product.name}>
                                {card.product.name}
                              </a>
                            </h3>
                          </li>
                          <li className="product-infos-table">
                            <div className="info-table-row">
                              <span className="label">Giá:</span>
                              <span className="value product-price">{formatPrice(card.product.price)}</span>
                            </div>
                            <div className="info-table-row">
                              <span className="label">Mã sản phẩm:</span>
                              <span className="value">{card.product._id}</span>
                            </div>
                            <div className="info-table-row">
                              <span className="label">Màu:</span>
                              <span className="value">{card.color}</span>
                            </div>
                            <div className="info-table-row">
                              <span className="label">Size:</span>
                              <span className="value">{card.size}</span>
                            </div>
                            <div className="info-table-row lineitem-qty">
                              <span className="label">Số lượng:</span>
                              <span className="qty-value">{card.quantity}</span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="cart-order-totals">
                    <table className="order-totals-table">
                      <tbody>
                        <tr className="order-subtotal">
                          <th scope="row">Tạm tính</th>
                          <td>{formatPrice(cartTotal)}</td>
                        </tr>
                        <tr className="order-estimate-tax">
                          <th scope="row">Giảm giá:</th>
                          <td>{priceFinal.Percent ? priceFinal.Percent : 0}%</td>
                        </tr>

                        <tr className="order-country-zone">
                          <th scope="row">Phí vận chuyển:</th>
                          <td>0đ</td>
                        </tr>
                        <tr className="order-country-zone">
                          <th scope="row">Giảm giá</th>
                          <td>{formatPrice(priceFinal.DiscountPriceL ? priceFinal.DiscountPriceL : 0)}</td>
                        </tr>
                        <tr className="order-total">
                          <th scope="row">Tổng cộng</th>
                          <td className="order-value">{formatPrice(priceFinal.Total ? priceFinal.Total : cartTotal)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="secondary" className="customer-support">
          <div className="mobile-headers">
            <button className="tab-header mobile-only active" data-target="#customer-support" aria-expanded="true" aria-controls="customer-support-tab">
              Need help?
            </button>
            <button className="tab-header" data-target="#shipping-returns" aria-expanded="false" aria-controls="shipping-returns-tab">
              DELIVERY &amp; RETURNS OFFERED
            </button>
          </div>
          <div className="tab active" id="customer-support">
            <div className="content-asset">
              <h2>
                <button className="tab-header mobile-only active" data-target="#customer-support" aria-expanded="true" aria-controls="customer-support-tab" disabled="disabled">
                  Need help?
                </button>
              </h2>
              <h2 className="desktop-only">Need help?</h2>
              <div id="customer-support-tab" className="tab-content">
                <div className="text">
                  <p className="subtitle">Customer support</p>
                  lorem ipsum dolor sit amet
                  <br />
                  lorem ipsum dolor sit amet
                  <br />
                  (lorem ipsum dolor sit amet).
                </div>
                <div className="links">
                  <a href className="contact-popin">
                    <i className="icon_Email" />
                    Email
                  </a>
                  <a href="tel:1 833 908 0147" className="contact-call call-to-button">
                    <i className="icon_Call" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="tab" id="shipping-returns">
            <div className="content-asset">
              <div className="tab" id="shipping-returns">
                <h2 className="desktop-only">DELIVERY &amp; RETURNS OFFERED</h2>
                <h2 className="mobile-only">
                  <button className="tab-header" data-target="#shipping-returns" aria-expanded="false" aria-controls="shipping-returns-tab" disabled="disabled">
                    DELIVERY &amp; RETURNS OFFERED
                  </button>
                </h2>
                <div className="tab-content" id="shipping-returns-tab">
                  <ul>
                    <li>Lorem Ipsum is</li>
                    <li>Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is</li>
                    <li>Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is</li>
                    <li>Lorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum isLorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is</li>
                    <li>Lorem Ipsum is Lorem Ipsum isLorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is Lorem Ipsum isLorem Ipsum isLorem Ipsum is.</li>
                    <li>Lorem Ipsum is Lorem Ipsum is Lorem Ipsum is </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* end body */}
    </>
  );
};

export default CheckOut;
