import { unwrapResult } from '@reduxjs/toolkit';
import { logout } from 'components/web/auth/userSlice';
import Cart from 'components/web/cart/Cart';
import { removeFromCart } from 'components/web/cart/CartSlice';
import { cartItemsCountSelector, cartTotalSelector } from 'components/web/cart/Selectors';
import CategoryParent from 'components/web/category/CategoryParent';
import { getListCategory } from 'components/web/category/CategorySlice';
import LoginFormHeader from 'components/web/form/LoginFormHeader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

const Header = function (props) {
  //hover animation
  const [hovered, setHovered] = useState(false);
  const [hoveredcart, setHoveredcart] = useState(false);
  const [hoveredwish, setHoveredwish] = useState(false);
  const [hoverUser, setHoveredUser] = useState(false); //check login
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser._id;

  //data
  // list category
  const dataCategoryList = useSelector((state) => state.categoryList.data);
  useEffect(() => {
    (async () => {
      try {
        if (dataCategoryList.length === 0) {
          const action = getListCategory({
            limit: 20,
            status: true,
          });
          const resultAction = await dispatch(action);
          unwrapResult(resultAction);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dataCategoryList.length, dispatch]);
  //logout
  const history = useHistory();
  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    history.push('/');
    window.location.reload();
  };

  //cart
  const dataCart = useSelector((state) => state.cart.dataCart);
  const countProduct = useSelector(cartItemsCountSelector);
  const cartTotal = useSelector(cartTotalSelector);
  const actionDeleteCart = (index) => dispatch(removeFromCart(index));

  return (
    <div>
      <Cart actionDeleteCart={actionDeleteCart} cartTotal={cartTotal} countProduct={countProduct} dataCart={dataCart} />

      {/* header */}
      <header className="header" id="header">
        <div id="js-overlay"></div>
        {/* phần 1 của header */}
        <div className="header-container">
          <ul className="header-links">
            <li className="level-1 country-selector">
              <a href="/#" className="country-selector-link navigation-hasSubMenu level-1" title="Location : US $ (Select a Country/Region)">
                Location<span>:</span>
                <strong>VN $</strong>
              </a>
            </li>
            <li className="language language-container desktop">
              <a className="language-selector-link" href="/#">
                Language
                <span className="current">(English)</span>
              </a>
            </li>
            <li className="level-1">
              <a className="level-1" href="/#">
                Contact
              </a>
            </li>
          </ul>
          <div className="logo">
            <h1 className="logo-title">
              <a href="/" className="logo-link">
                <img src="/image/logo.svg" alt="HomieReal" />
              </a>
            </h1>
          </div>
          <div className="header-right-container">
            {!isLoggedIn && (
              <ul className="header-links" role="presentation">
                <li className={`level-1 account-nav header-link ${hovered ? 'hover' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                  <a className={`level-1 ${hovered ? 'hover' : ''}`} href="/Login">
                    Sign in
                  </a>
                  <div className="level-2" style={{ height: 'auto', overflow: 'visible' }}>
                    <a href className="level-2 back" wfd-invisible="true">
                      Sign in
                    </a>
                    <LoginFormHeader />
                    {/* onSubmit={handleLoginFormSubmit} */}
                  </div>
                </li>
              </ul>
            )}
            {isLoggedIn && (
              <ul className="header-links" role="presentation" id="myacc">
                <li className={`level-1 account-nav header-link ${hoverUser ? 'hover' : ''}`} onMouseEnter={() => setHoveredUser(true)} onMouseLeave={() => setHoveredUser(false)}>
                  <ul className="header-links" role="presentation">
                    <li className="level-1 account-nav header-link">
                      <a className="level-1 authenticated navigation-hasSubMenu" href="/myaccount">
                        My account<span>:</span>
                        <span className="name">
                          <strong>
                            {loggedInUser.gender === "Male" && "Ông"}
                            {loggedInUser.gender === "Female" && "Bà"}.
                          </strong>
                          <strong>{loggedInUser.fistname + ' ' + loggedInUser.lastname} </strong>
                        </span>
                      </a>
                      <div className="level-2 authenticated">
                        <a href="/myaccount" className="level-2 back">
                          My account
                        </a>
                        <ul>
                          <li>
                            <a href="/myaccount">Account overview </a>
                          </li>
                          <li className="order-history ">
                            <a href="/order">Orders </a>
                          </li>
                          <li className="wishlist-menu-item">
                            <a href="/wishlist">Wishlist (5)</a>
                          </li>
                          <li>
                            <a href="/editaccount">Personal details </a>
                          </li>
                          <li>
                            <a href="/addresses">Addresses</a>
                          </li>

                          <li>
                            <a className="cursor" href onClick={handleLogout}>
                              Logout
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            )}

            <div className={`miniwishlist ${hoveredwish ? 'hover' : ''}`} onMouseEnter={() => setHoveredwish(true)} onMouseLeave={() => setHoveredwish(false)}>
              <a className="miniwishlist-link" href="/#" aria-label="See your wishlist (1)">
                <i className="icon icon_Wishlist" />
                <i className="icon icon_Wishlist_Active" title="See your wishlist (1)" />
                <span className="miniwishlist-quantity" data-quantity={1}>
                  1
                </span>
              </a>
              <div className="miniwishlist-content">
                <ul className="miniwishlist-products">
                  <li className="wishlistlineitem">
                    <a href="/#" title="Discover your future Dress in 4G jacquard " className="miniwishlist-product">
                      <div className="miniwishlist-product-image">
                        <picture className>
                          <source srcSet="" media="(min-width: 1800px)" />
                          <img srcSet="http://placehold.it/800x1200" alt="đang phát triển" />
                        </picture>
                      </div>
                      <div className="miniwishlist-product-details">
                        <div className="miniwishlist-product-name">Áo 1</div>
                        <div className="miniwishlist-product-date">Thêm vào 08/18/21</div>
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="miniwishlist-buttons">
                  <div className="form-row-button">
                    <a href className="form-button">
                      See my wishlist
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* cart */}
            <div className="mobile-minicart-added" wfd-invisible="true">
              1 item has been added to your cart
            </div>
            <div
              className={`minicart empty-cart ${hoveredcart ? 'hover' : ''}`}
              id="minicartnotempty"
              onMouseEnter={() => setHoveredcart(true)}
              onMouseLeave={() => setHoveredcart(false)}
            >
              <button className="minicart-link empty-cart" aria-label="View Your Cart">
                <span className="icon_Bag" title="View Your Cart">
                  ({countProduct})
                </span>
              </button>
              {countProduct === 0 && (
                <div className="minicart-content">
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>
            <div className="search-link-container" role="search">
              <Link className="search-link">
                <span className="icon icon_Search" />
                <span className="visually-hidden">Search</span>
              </Link>
            </div>
          </div>
        </div>
        <button className="header-burgerMenu js-header-burgerMenu" data-current-category="null" data-category-path="null" wfd-invisible="true">
          <span className="icon icon_Menu" />
          <span className="sr-only visually-hidden">Menu</span>
        </button>
        {/* Navigation */}
        <nav className="navigation">
          <ul className="level-1" id="navbar">
            <CategoryParent data={dataCategoryList} />
          </ul>
        </nav>
      </header>
      {/* <div className="notification-live-region" aria-live="polite" role="status">
        <div className="wishlist-action-confirm success search notification-banner" style={{ display: 'block' }}>
          <div className="added" aria-live="polite" role="status">
            <span>Added to wishlist</span>
            <a href="">View</a>
          </div>
        </div>
      </div> */}
      {/* end header */}
    </div>
  );
};

export default Header;
