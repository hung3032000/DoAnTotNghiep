import Modal from 'components/web/modal/modal';
import { cartTotalSelector } from 'slice/Selectors';
import Voucher from 'components/web/voucher';
import { THUMNAIL_URL_PRODUCTINFO } from 'constants/index';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils/common';
import React, { useEffect } from 'react';
import { getAllVoucherUser, getPriceAfterUsingVoucher } from 'slice/voucherSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function UserDetailCart({ actionDeleteCart, actionUpdateCartProduct }) {
  const dispatch = useDispatch();
  const dataVoucherList = useSelector((state) => state.voucher.voucher);
  //useEffect
  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);
        const action = getAllVoucherUser();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    })();
  }, [dispatch]);
 

  const handleVoucherFormSubmit = (values) => {
    try {
      let isDisCount = (cartTotal * values.discountPercent) / 100 - values.priceOrderLimit;
      let totalFinalPrice;
      let DiscountPriceL;
      if (isDisCount <= 0) {
        totalFinalPrice = cartTotal - (cartTotal * values.discountPercent) / 100;
        DiscountPriceL = (cartTotal * values.discountPercent) / 100;
      } else {
        totalFinalPrice = cartTotal - values.priceOrderLimit;
        DiscountPriceL = values.priceOrderLimit
      }
      const data = {
        Total: totalFinalPrice,
        Percent: values.discountPercent,
        DiscountPriceL: DiscountPriceL
      };
      // setLoading(true);
      const action = getPriceAfterUsingVoucher(data);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
    } catch (error) {
      console.log('Failed to login:', error);
    } finally {
      // setLoading(false);
    }
  };
  //cart
  const dataCart = useSelector((state) => state.cart.dataCart);
  const priceFinal = useSelector((state) => state.voucher.data);
  const cartTotal = useSelector(cartTotalSelector);
  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);
        const data = {
          Total: 0,
          Percent: 0,
          DiscountPriceL: 0
        };
        // setLoading(true);
        const action = getPriceAfterUsingVoucher(data);
        const resultAction = dispatch(action);
        unwrapResult(resultAction);
        
      } catch (error) {
        // console.log('Failed to fetch product', error);
      } finally {
        // setLoading(false);
      }
    })();
  }, [cartTotal, dispatch]);

  const handleSearchFormSubmit = async (values) => {
    try {
      console.log(values);
      // setLoading(true);
      // const action = login(values);
      // const resultAction = await dispatch(action);
      // unwrapResult(resultAction);
    } catch (error) {
      console.log('Failed to login:', error);
      // enqueueSnackbar('Mật khẩu hoặc tài khoản không chính xác', { variant: 'error' });
      // history.push('/login');
      // window.location.reload();
    } finally {
      // setLoading(false);
    }
  };

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
        <h2 className="products-title">Sản phẩm</h2>
        {dataCart.map((card, index) => (
          <div key={index} className="line-item" data-product="BW60T4111N-100" data-quantity={2.0}>
            <div className="product-image">
              <img src={card.product.imageMain ? card.product.imageMain : THUMNAIL_URL_PRODUCTINFO} alt="Lỗi ảnh" />
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
                  {card.product.saleId ? (
                    <span className="value product-price">{formatPrice(card.product.price - (card.product.price * card.product.saleId.percentSale) / 100)} </span>
                  ) : (
                    <span className="value product-price">{formatPrice(card.product.price)}</span>
                  )}
                </div>
                <div className="info-table-row">
                  <span className="label">Mã sản phẩm:</span>
                  <span className="value">{card.product._id}</span>
                </div>
                <div className="info-table-row">
                  <span className="label">Màu: </span>
                  <span className="value">{card.color}</span>
                </div>
                <div className="info-table-row">
                  <span className="label">Size: </span>
                  <span className="value">{card.size}</span>
                </div>
                <div className="info-table-row">
                  <span className="label">Kích cỡ:</span>
                  <span className="value">{card.product._id}</span>
                </div>
                <div className="info-table-row lineitem-quantity">
                  <span className="label">
                    <span className="no-mobile">Số lượng:</span>
                    <span className="mobile-only">Slg:</span>
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
          <Modal classNameModal={'form-button secondary anchor'} id={'add-coupon'} label={'Nhập mã'}>
            <Voucher vouchers={dataVoucherList} onSubmit={handleVoucherFormSubmit} onSubmitSearch={handleSearchFormSubmit} />
          </Modal>
        </div>

        {/* <div className="form-row-button form-row-button-cart" align="center">
          <Modal classNameModal={'form-button secondary anchor'} id={'share-basket'} label={'Chia sẻ giỏ hàng'}>
            Chia sẻ giỏ hàng
          </Modal>
        </div> */}
        <div className="form-row-button form-row-button-cart" align="center" />
      </div>
      <div className="col-sm-6" id="cart-summary-fixed" style={{ marginTop: '0px', marginBottom: '10px'}}>
        <h2 className="summary-title">Tổng kết</h2>
        <div className="cart-summary">
          <div className="cart-footer">
            <div className="cart-order-totals">
              <table className="order-totals-table">
                <tbody>
                  <tr className="order-subtotal">
                    <th scope="row">Tạm tính</th>
                    <td>{formatPrice(cartTotal)}</td>
                  </tr>
                  <tr className="order-estimate-tax">
                    <th scope="row">% giảm giá:</th>
                    <td>{priceFinal.Percent ? priceFinal.Percent : 0}%</td>
                  </tr>

                  <tr className="order-country-zone">
                    <th scope="row">Phí vận chuyển:</th>
                    <td>$0.00</td>
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
