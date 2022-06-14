import { logout } from 'slice/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { listNavUser } from 'constants/index';

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
          {listNavUser.map((data, index) => (
            <li key={index} className={data.className}>
              <NavLink activeClassName="active" to={data.href}>
                {data.label}
              </NavLink>
            </li>
          ))}
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
