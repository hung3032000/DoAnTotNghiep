import { cartTotalSelector } from 'components/web/cart/Selectors';
import { THUMNAIL_URL_PRODUCTINFO } from 'constants/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from 'utils/common';
function UserDetailCart({ actionDeleteCart, actionUpdateCartProduct }) {
  //cart
  const dataCart = useSelector((state) => state.cart.dataCart);
  const cartTotal = useSelector(cartTotalSelector);
  const onUpdateQuantity = (index, quantity) => {
    const dataCart = {
      index: index,
      quantity: quantity,
    };
    if (quantity > 0) {
      actionUpdateCartProduct(dataCart);
    }
  };
  //   const thumnailUrl = dataCart.product.ProductImage ? `${STATIC_HOST}${dataCart.product.ProductImage?.url}` : THUMNAIL_URL_PRODUCTLIST;
  const deleteCart = (index) => {
    actionDeleteCart(index);
  };
  return (
    <div className="row">
      <div className="col-sm-6">
        <h2 className="products-title">Products</h2>
        {dataCart.map((card, index) => (
          <div className="line-item" data-product="BW60T4111N-100" data-quantity={2.0}>
            <div className="product-image">
              <img src={card.product.images ? card.product.images : THUMNAIL_URL_PRODUCTINFO} alt="Lỗi ảnh" />
            </div>
            <ul className="product-infos">
              <li className="item-name">
                <h3>
                  <a href title="Discover your future Oversized shirt with fold of fabric collar">
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
                  <span className="value">{card.product.Color}</span>
                </div>
                <div className="info-table-row">
                  <span className="label">Kích cỡ:</span>
                  <span className="value">{card.product._id}</span>
                </div>
                <div className="info-table-row lineitem-quantity">
                  <span className="label">
                    <span className="no-mobile">Số lượng:</span>
                    <span className="mobile-only">Qty:</span>
                  </span>
                  <span className="value">
                    <button
                      className="lineitem-quantity-more"
                      data-qty={1}
                      name="Quantity"
                      value="+"
                      aria-label="Add One"
                      type="submit"
                      onClick={() => {
                        onUpdateQuantity(index, card.quantity + 1);
                      }}
                    >
                      <span className="icon_PlusS" />
                    </button>
                    <span className="quantity-value">{card.quantity}</span>
                    <button
                      className="lineitem-quantity-less"
                      data-qty={2}
                      name="Quantity"
                      value="-"
                      aria-label="Remove One"
                      type="submit"
                      onClick={() => {
                        onUpdateQuantity(index, card.quantity - 1);
                      }}
                    >
                      <span className="icon_MinusS" />
                    </button>
                  </span>
                </div>
              </li>
              <li className="item-user-actions">
                <a href className="add-to-wishlist cursor">
                  <span>Thêm vào wishlist </span>
                </a>
                <a
                  className="remove-product cursor"
                  href
                  onClick={() => {
                    deleteCart(index);
                  }}
                >
                  <span>
                    Xoá<span className="no-mobile"> sản phẩm</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        ))}
        <div className="form-row-button form-row-button-cart" align="center">
          <a className="form-button secondary" id="add-coupon" href="!#">
            Nhập mã
          </a>
        </div>
        <div className="form-row-button form-row-button-cart" align="center">
          <a className="form-button secondary" id="share-basket" href="!#">
            Chia sẻ giỏ hàng
          </a>
        </div>
        <div className="form-row-button form-row-button-cart" align="center" />
      </div>
      <div className="col-sm-6" id="cart-summary-fixed" style={{ marginTop: '0px' }}>
        <h2 className="summary-title">Tổng kết</h2>
        <div className="cart-summary">
          <div className="cart-footer">
            <input type="hidden" name="dwfrm_cart_updateCart" defaultValue="dwfrm_cart_updateCart" />
            <div className="cart-order-totals">
              <table className="order-totals-table">
                <tbody>
                  <tr className="order-subtotal">
                    <th scope="row">Tổng phụ</th>
                    <td>{formatPrice(cartTotal)}</td>
                  </tr>
                  <tr className="order-estimate-tax">
                    <th scope="row">Thuế:</th>
                    <td>$0.00</td>
                  </tr>

                  <tr className="order-country-zone">
                    <th scope="row">VN</th>
                    <td>$0.00</td>
                  </tr>
                  <tr className="order-total">
                    <th scope="row">Tổng cộng</th>
                    <td className="order-value">{formatPrice(cartTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <legend className="visually-hidden">Đặt hàng</legend>
          <a href="/checkout" className="form-button" type="submit" value="Order" name="dwfrm_cart_checkoutCart">
            Đặt hàng
          </a>
          <div className="payment-icons-list">
            <div className="payment-icons">
              <img src="/image/visa.png" alt="Visa" />
            </div>
            <div className="payment-icons">
              <img src="/image/mastercard.png" alt="MasterCard" />
            </div>
            <div className="payment-icons">
              <img src="/image/american-express.png" alt="American Express" />
            </div>
            <div className="payment-icons">
              <img src="/image/discover.png" alt="Discover" />
            </div>
            <div className="payment-icons">
              <img src="/image/JCB.png" alt="JCB" />
            </div>
            <div className="payment-icons">
              <img src="/image/union-pay.png" alt="CUP" />
            </div>
            <div className="payment-icons">
              <img src="/image/apple-pay.png" alt="Apple Pay" />
            </div>
            <div className="payment-icons">
              <img src="/image/paypal.png" alt="PAYPAL" />
            </div>
            <div className="payment-icons">
              <img src="/image/klarna_64x40.png" alt="Klarna" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailCart;
