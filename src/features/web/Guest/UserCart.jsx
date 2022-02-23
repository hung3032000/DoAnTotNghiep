import { removeFromCart, updateCartProduct } from 'components/web/cart/CartSlice';
import { cartItemsCountSelector } from 'components/web/cart/Selectors';
import UserDetailCart from 'components/web/cart/UserDetailCart';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function UserCart() {
  // const dataCart = useSelector((state) => state.cart.dataCart);
  const countProduct = useSelector(cartItemsCountSelector);
  // const cartTotal = useSelector(cartTotalSelector);

  const dispatch = useDispatch();
  const actionDeleteCart = (index) => dispatch(removeFromCart(index));
  const actionUpdateCartProduct = (dataCart) => dispatch(updateCartProduct(dataCart));
  return (
    <div>
      <main id="main" role="main" className="full-width clearfix" style={{ marginTop: '128px' }}>
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div id="primary" className="primary-content">
          <div className="container">
            {countProduct === 0 && (
              <div className="page-header">
                <h1>
                  <span className="title">Your cart</span>
                </h1>
                <p className="text">Your cart is empty</p>
                <div className="form-row">
                  <a href="/" className="button-text" type="submit" value="global.continueshopping" name="dwfrm_cart_continueShopping">
                    CONTINUE SHOPPING
                  </a>
                </div>
              </div>
            )}

            {countProduct !== 0 && (
              <div>
                <div className="page-header">
                  <h1>
                    <span className="title">Your cart</span>
                  </h1>
                  <p className="text">
                    Items in your cart are not yet reserved. Please proceed with your purchase to secure your items. Standard delivery and returns are complimentary.
                  </p>
                </div>
                <UserDetailCart 
                  actionUpdateCartProduct={actionUpdateCartProduct} 
                  actionDeleteCart={actionDeleteCart}/>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserCart;
