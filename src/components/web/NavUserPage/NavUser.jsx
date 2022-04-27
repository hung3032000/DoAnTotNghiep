import { logout } from 'components/web/auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function NavUser(props) {
  const dispatch = useDispatch();
  //logout
  const history = useHistory();
  const handleLogout = () => {
    const action = logout();
    dispatch(action);
    history.push('/');
    window.location.reload();
  };
  return (
    <div>
      <nav className="account-navigation" aria-label="My account">
        <ul>
          <li className>
            {/* "active" */}
            <Link to="/myaccount">Tổng quan tài khoản</Link>
          </li>
          <li className="order-history ">
            <Link to="/order">Đơn hàng</Link>
          </li>
          {/* <li className=" wishlist-menu-item">
            <Link to="/wishlist">Wishlist (5)</Link>
          </li> */}
          <li className>
            <a href="/editaccount" title="Personal details (Active page)">
              Thông tin cá nhân
            </a>
          </li>
          {/* <li className>
            <Link to="/addresses">Addresses</Link>
          </li> */}
          <li>
            <a className="cursor" href onClick={handleLogout}>
              Đăng xuất
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavUser;
