import { unwrapResult } from '@reduxjs/toolkit';
import { login, logout } from 'slice/userSlice';
import { removeFromCart } from 'slice/CartSlice';
import { cartItemsCountSelector, cartTotalSelector } from 'slice/Selectors';
import CategoryParent from 'components/web/category/CategoryParent';
import { getListCategory } from 'slice/CategorySlice';
import LoginFormHeader from 'components/web/form/LoginFormHeader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, NavLink, Link } from 'react-router-dom';
import Loader from 'components/fullPageLoading';
import Modal from 'components/web/modal/modal';
import Cart from 'components/web/cart/Cart';
import Search from 'components/web/search/Search';
import { getListProductSearch } from 'slice/ProductListSlice';
import { listNavUser } from 'constants/index';
import { getTopTrending } from 'slice/SearchSlice';
const Header = function (props) {
  //hover animation
 
  const [hovered, setHovered] = useState(false);
  const [hoveredcart, setHoveredcart] = useState(false);
  const [hoverUser, setHoveredUser] = useState(false); //check login
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser._id;

  //data
  const [loading, setLoading] = useState(false);

  // list category
  const dataCategoryList = useSelector((state) => state.categoryList.data);
  useEffect(() => {
    (async () => {
      try {
        if (dataCategoryList.length === 0) {
          setLoading(true);
          const action = getListCategory({
            limit: 50,
            status: true,
          });
          const resultAction = await dispatch(action);
          unwrapResult(resultAction);
        }
        setLoading(true);
        const actionSearch = getListProductSearch();
        const resultActionSearch = await dispatch(actionSearch);
        unwrapResult(resultActionSearch);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
  const dataTrending = useSelector((state) => state.search.data);
  const actionDeleteCart = (index) => dispatch(removeFromCart(index));
  const handleLoginFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      // history.push('/');
      // window.location.reload();
    } catch (error) {
      console.log('Failed to login:', error);
      // enqueueSnackbar('M???t kh???u ho???c t??i kho???n kh??ng ch??nh x??c', { variant: 'error' });
      history.push('/login');
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getTopTrending();
        const resultActionChild = dispatch(action);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  return (
    <div>
      <Loader showLoader={loading} />
      <header className="header" id="header">
        <div className="header-container">
          <ul className="header-links">
            <li className="level-1 country-selector">
              <a href="/#" className="country-selector-link navigation-hasSubMenu level-1" title="Location : US $ (Select a Country/Region)">
                ?????a ??i???m<span>:</span>
                <strong>VN(VN??)</strong>
              </a>
            </li>
            <li className="language language-container desktop">
              <a className="language-selector-link" href="/#">
                Ng??n ng???
                <span className="current">(VN)</span>
              </a>
            </li>
            <li className="level-1">
              <a className="level-1" href="/#">
                Li??n l???c
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
                    ????ng nh???p
                  </a>
                  <div className="level-2" style={{ height: 'auto', overflow: 'visible' }}>
                    <a href className="level-2 back" wfd-invisible="true">
                      ????ng nh???p
                    </a>
                    <LoginFormHeader onSubmit={handleLoginFormSubmit} />
                  </div>
                </li>
              </ul>
            )}
            {isLoggedIn && (
              <ul className="header-links" role="presentation" id="myacc">
                <li className={`level-1 account-nav header-link ${hoverUser ? 'hover' : ''}`} onMouseEnter={() => setHoveredUser(true)} onMouseLeave={() => setHoveredUser(false)}>
                  <ul className="header-links" role="presentation">
                    <li className="level-1 account-nav header-link">
                      <a className="level-1 authenticated navigation-hasSubMenu" href="/order">
                        T??i kho???n<span>:</span>
                        <span className="name">
                          <strong>
                            {loggedInUser.gender === 'Male' && '??ng'}
                            {loggedInUser.gender === 'Female' && 'B??'}.
                          </strong>
                          <strong>{loggedInUser.fistname + ' ' + loggedInUser.lastname} </strong>
                        </span>
                      </a>
                      <div className="level-2 authenticated">
                        <NavLink activeClassName="active" to="/order" className="level-2 back">
                          T??i kho???n
                        </NavLink>
                        <ul>
                          {listNavUser.map((data, index) => (
                            <li key={index} className={data.className}>
                              <NavLink activeClassName="active" to={data.href}>
                                {data.label}
                              </NavLink>
                            </li>
                          ))}
                          <li>
                            <Link className="cursor" onClick={handleLogout}>
                              Tho??t
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
            {/* cart */}
            <div className="mobile-minicart-added" wfd-invisible="true">
              1 item has been added to your cart
            </div>
            <div className={`minicart empty-cart ${hoveredcart ? 'hover' : ''}`} onMouseEnter={() => setHoveredcart(true)} onMouseLeave={() => setHoveredcart(false)}>
              <Modal
                classNameModal={'minicart-link empty-cart'}
                label={
                  <span className="icon_Bag" title="View Your Cart">
                    ({countProduct})
                  </span>
                }
              >
                <Cart actionDeleteCart={actionDeleteCart} cartTotal={cartTotal} countProduct={countProduct} dataCart={dataCart} />
              </Modal>

              {countProduct === 0 && (
                <div className="minicart-content">
                  <p>Gi??? h??ng ??ang tr???ng</p>
                </div>
              )}
            </div>

            <div className="search-link-container" role="search">
              <a href className="search-link">
                <Modal classNameModal={'icon icon_Search anchor'}>
                  <Search data={dataTrending}/>
                </Modal>
              </a>
            </div>
          </div>
        </div>
        <button className="header-burgerMenu js-header-burgerMenu">
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
    </div>
  );
};

export default Header;
