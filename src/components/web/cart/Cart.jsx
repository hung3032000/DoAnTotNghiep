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
            <button title="Close" tabIndex={0}>
              <span>
                <i className="icon_Close" />
              </span>
            </button>
          </div>
          <div className="minicart-title">
            <p>
              <span className="title"> Your cart </span>
              <span className="bag-quantity">
                <i className="icon_Bag" /> ({countProduct})
              </span>
            </p>
          </div>
          {countProduct === 0 && <p className="centered">Your cart is empty</p>}
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
                   title="Discover your future {0}" 
                   tabIndex={0}>
                    {card.product.name}
                  </a>
                  <div className="minicart-product-color">
                    <span className="label">Color:</span> <span className="value">{card.product.Color}</span>
                  </div>
                  <div className="minicart-product-size">
                    <span className="label">Size:</span> <span className="value">{card.product._id}</span>
                  </div>
                  <div className="minicart-product-qty">
                    <span className="label">Qty:</span>
                    <span className="value">{card.quantity}</span>
                  </div>
                  <div className="minicart-product-pricing">
                    <span className="label"> Price: </span> <span className="value">{formatPrice(card.product.price)}</span>
                  </div>
                  <a
                    className="remove-product cursor"
                    href
                    onClick={() => {
                      deleteCart(index);
                    }}
                  >
                    <span> Remove Item </span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
          {countProduct !== 0 && (
            <div className="minicart-summary">
              <div className="minicart-total">
                <span className="label">Total</span> <span className="value"> {formatPrice(cartTotal)}</span>
              </div>
              <div className="minicart-buttons">
                <div className="form-row-button">
                  <a className="form-button checkout-start" href="/checkout" title="Order" tabIndex={0}>
                    Order
                  </a>
                </div>
              </div>
              <div className="other-payment">
                <span>or</span>
              </div>
              <div className="minicart-buttons">
                <div className="form-row-button">
                  <a className="form-button checkout-start" href="/paypal" title="Order" tabIndex={0}>PayPal
                    {/* <div class="centered" ref={paypal}></div> */}
                  </a>
                </div>
              </div>

              <div className="minicart-buttons">
                <div className="form-row-button">
                  <a className="form-button checkout-start" href="/usercart" title="Order" tabIndex={0}>
                    Edit Your Cart
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
