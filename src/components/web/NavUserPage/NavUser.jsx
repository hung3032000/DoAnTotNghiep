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
            <Link to="/myaccount">Account overview</Link>
          </li>
          <li className="order-history ">
            <Link to="/order">Orders</Link>
          </li>
          {/* <li className=" wishlist-menu-item">
            <Link to="/wishlist">Wishlist (5)</Link>
          </li> */}
          <li className>
            <a href="/editaccount" title="Personal details (Active page)">
              Personal details
            </a>
          </li>
          {/* <li className>
            <Link to="/addresses">Addresses</Link>
          </li> */}
          <li>
            <a className="cursor" href onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavUser;
