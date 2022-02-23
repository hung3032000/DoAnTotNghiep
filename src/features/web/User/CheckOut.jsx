import { cartTotalSelector } from 'components/web/cart/Selectors';
import CheckOutForm from 'components/web/form/CheckOutForm';
import React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { formatPrice } from 'utils';
import { THUMNAIL_URL_PRODUCTLIST } from 'constants/index';
import { useHistory } from "react-router-dom";
import { addOrderUser,checkout } from 'components/admin/order/OrderSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { emptyCart } from 'components/web/cart/CartSlice';
// import { checkout } from 'components/admin/order/OrderSlice';

const CheckOut = function (props) {
  const history = useHistory();
  const dataUser = useSelector((state) => state.user.current);
  const dataCart = useSelector((state) => state.cart.dataCart);
  const cartTotal = useSelector(cartTotalSelector);
  const dispatch = useDispatch();
  const handleCheckOutFormSubmit = async (values) => {
    try {
      values.addressrecevie = {
        name: values.FName,
        phonenumber: values.Phone,
        address: values.Address,
      };
      let item = {
        productId: 1,
        quantity: 2,
        totalPrice: 200,
      };
      let items = [];
      for (let i = 0; i < dataCart.length; i++) {
        item.productId = dataCart[i].product._id;
        item.quantity = dataCart[i].quantity;
        item.totalPrice = dataCart[i].quantity * dataCart[i].product.price;
        items.unshift(item);
        item = {
          productId: 1,
          quantity: 2,
          totalPrice: 200,
        };
      }
      values.userId = dataUser._id;
      values.items = items;
      values.totalPrice = cartTotal;
      
      values.isPaypal = false;
      const action = addOrderUser(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
      const action2 = checkout();
      dispatch(action2);
      const action3 = emptyCart();
      dispatch(action3);
      history.push('/order');
      window.location.reload();
      
    } catch (error) {
      console.log('Failed to login:', error);
    }
  };
  return (
    <div>
      {/* Body */}
      <main id="main" role="main" className="primary-focus clearfix" style={{ marginTop: '128px' }}>
        <div id="primary" className="primary-content">
          <div className="container">
            <div id="primary" className="primary-content">
              <div className="shipping">
                <div className="page-header">
                  <h1>
                    <span className="title">Place your order</span>
                  </h1>
                </div>
                <div className="col-sm-6 checkout-area">
                  <h2 className="no-mobile">Finalize your order</h2>
                  <div className="step-area shipping ">
                    <div className="step-title">
                      <div className="step">1</div>
                      <h3>Delivery</h3>
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
                  <h2>Summary</h2>
                  <div className="checkout-mini-cart">
                    {dataCart.map((card) => (
                      <div key={card.id} className="line-item">
                        <div className="product-image">
                          <img src={card.product.images ? card.product.images : THUMNAIL_URL_PRODUCTLIST} alt="ProductImage" />
                        </div>
                        <ul className="product-infos datacart-ul">
                          <li className="item-name">
                            <h3>
                              <a href="/#" title="Discover your future Homie Schematics oversized T-shirt">
                                {card.product.name}
                              </a>
                            </h3>
                          </li>
                          <li className="product-infos-table">
                            <div className="info-table-row">
                              <span className="label">Price:</span>
                              <span className="value product-price">{formatPrice(card.product.price)}</span>
                            </div>
                            <div className="info-table-row">
                              <span className="label">Product code:</span>
                              <span className="value">{card.product._id}</span>
                            </div>
                            <div className="info-table-row">
                              <span className="label">Color:</span>
                              <span className="value">{card.product.Color}</span>
                            </div>
                            <div className="info-table-row">
                              <span className="label">Size:</span>
                              <span className="value">{card.product.Color}</span>
                            </div>
                            <div className="info-table-row lineitem-qty">
                              <span className="label">Qty:</span>
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
                          <th scope="row">Subtotal</th>
                          <td>{formatPrice(cartTotal)}</td>
                        </tr>
                        <tr className="order-sales-tax">
                          <th scope="row">Taxes</th>
                          <td>-</td>
                        </tr>
                        <tr className="order-shipping">
                          <th scope="row">Delivery charges</th>
                          <td>{formatPrice(cartTotal)}</td>
                        </tr>
                        <tr className="order-total">
                          <th scope="row">Total</th>
                          <td className="order-value">{formatPrice(cartTotal)}</td>
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
    </div>
  );
};

export default CheckOut;
