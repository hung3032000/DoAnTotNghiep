import {  THUMNAIL_URL_PRODUCTLIST } from 'constants/index';
import React from 'react';
import { formatPrice } from 'utils/common';

function Cart({ actionDeleteCart,cartTotal,countProduct,dataCart }) {
  const deleteCart = (index) => {
    actionDeleteCart(index);
  };
  return (
    <div>
      <div id="minicart-container" aria-hidden="false">
        <div id="js-overlay"></div>
        <div className="minicart-content">
          <div className="minicart-close">
            <button title="Close">
              <span>
                <i className="icon_Close" />
              </span>
            </button>
          </div>
          <div className="minicart-title">
            <p>
              <span className="title"> Giỏ hàng </span>
              <span className="bag-quantity">
                <i className="icon_Bag" /> ({countProduct})
              </span>
            </p>
          </div>
          {countProduct === 0 && <p className="centered">Giỏ hàng của bạn đang trống</p>}
          <ul className="minicart-products">
            {dataCart.map((card, index) => (
              <li key={card.id} className="minicart-product" data-qty="Quantity: value=1, unit=">
                <div className="minicart-product-image">
                  <img src={card.product.images ? card.product.images : THUMNAIL_URL_PRODUCTLIST} alt="Lỗi ảnh" />
                </div>
                <div className="minicart-product-details">
                  <a className="minicart-product-name cursor"
                   href
                  //  ={`productinf/${card.product._id}`} 
                   title={card.product.name} 
                  >
                    {card.product.name}
                  </a>
                  <div className="minicart-product-color">
                    <span className="label">Màu:</span> <span className="value">{card.color}</span>
                  </div>
                  <div className="minicart-product-size">
                    <span className="label">Size:</span> <span className="value">{card.size}</span>
                  </div>
                  <div className="minicart-product-qty">
                    <span className="label">Số lượng:</span>
                    <span className="value">{card.quantity}</span>
                  </div>
                  <div className="minicart-product-pricing">
                    <span className="label">Giá: </span> <span className="value">{formatPrice(card.price)}</span>
                  </div>
                  <a
                    className="remove-product cursor"
                    href
                    onClick={() => {
                      deleteCart(index);
                    }}
                  >
                    <span> Xoá khỏi giỏ hàng </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {countProduct !== 0 && (
            <div className="minicart-summary">
              <div className="minicart-total">
                <span className="label">Tổng cộng:</span> <span className="value"> {formatPrice(cartTotal)}</span>
              </div>
              <div className="minicart-buttons">
                <div className="form-row-button">
                  <a className="form-button checkout-start" href="/checkout" title="Order" tabIndex={0}>
                    Đặt hàng
                  </a>
                </div>
              </div>
              <div className="other-payment">
                <span>hoặc</span>
              </div>
              <div className="minicart-buttons">
                <div className="form-row-button">
                  <a className="form-button checkout-start" href="/paypal" title="Paypal" tabIndex={0}> Thanh toán PayPal
  
                  </a>
                </div>
              </div>

              <div className="minicart-buttons">
                <div className="form-row-button">
                  <a className="form-button checkout-start" href="/usercart" title="Order" tabIndex={0}>
                    Chỉnh sửa giỏ hàng
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
