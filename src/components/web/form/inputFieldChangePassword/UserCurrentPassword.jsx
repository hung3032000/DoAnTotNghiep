import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserCurrentPassword.propTypes = {
  formUserCurrentPassword: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserCurrentPassword(props) {
  // const { errors, formState } = formRUserPassword;
  // const hasErrors = formState.touched[name] && errors[name];

  const { formUserCurrentPassword, name } = props;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="form-row required empty">
      <label className="form-label" >
        Current password *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formUserCurrentPassword.control}
          as={<input />}
          className="form-input currentpassword form-field required"
          type={passwordShown ? 'text' : 'password'}
          defaultValue
          maxLength={14}
          data-dwname="password"
          autoComplete="current-password"
          aria-required="true"
          aria-invalid="false"
          aria-describedby="dwfrm_profile_login_password_d0rlzqwexnuh-error"
        />
        <span id="dwfrm_profile_login_password_d0rlzqwexnuh-error" className="error" />
        <i className="password-show" onClick={togglePasswordVisiblity}>
          {passwordShown ? 'Hide' : 'Show'}
        </i>
      </div>
    </div>
  );
}

export default UserCurrentPassword;
