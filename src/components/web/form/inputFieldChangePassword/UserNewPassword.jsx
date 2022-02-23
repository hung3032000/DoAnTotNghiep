import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserNewPassword.propTypes = {
  formUserNewPassword: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserNewPassword(props) {
  const { formUserNewPassword, name } = props;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="form-row required empty" >
      <label className="form-label" >
        New password *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formUserNewPassword.control}
          as={<input />}
          className="form-input newpassword form-field required"
          type={passwordShown ? 'text' : 'password'}
          defaultValue
          maxLength={14}
        />
        <span id="dwfrm_profile_login_password_d0rlzqwexnuh-error" className="error" />
        <i className="password-show" onClick={togglePasswordVisiblity}>
          {passwordShown ? 'Hide' : 'Show'}
        </i>
      </div>
    </div>
  );
}

export default UserNewPassword;
