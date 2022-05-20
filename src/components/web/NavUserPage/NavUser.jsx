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
          {/* <li className="active">
            <Link to="/myaccount">Tổng quan tài khoản</Link>
          </li> */}
          <li className="order-history ">
            <Link to="/order">Đơn hàng</Link>
          </li>
          <li className>
            <Link to="/editaccount">
              Thông tin cá nhân
            </Link>
          </li>
          <li className>
            <Link to="/addresses">Địa chỉ</Link>
          </li>
          <li>
            <Link className="cursor" onClick={handleLogout}>
              Đăng xuất
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavUser;
