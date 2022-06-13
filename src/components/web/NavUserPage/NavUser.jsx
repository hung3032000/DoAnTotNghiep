import { logout } from 'slice/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory,Link } from 'react-router-dom';

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
      <nav className="account-navigation">
        <ul>
          <li className="order-history ">
            <NavLink activeClassName="active" to="/order">Đơn hàng</NavLink>
          </li>
          <li className>
            <NavLink activeClassName="active" to="/editaccount">
              Thông tin cá nhân
            </NavLink>
          </li>
          <li className>
            <NavLink activeClassName="active" to="/addresses">Địa chỉ</NavLink>
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
