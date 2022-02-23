import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserRetypePasword.propTypes = {
  formUserRetypePassword: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserRetypePasword(props) {
  const { formUserRetypePassword, name } = props;
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div className="form-row required empty">
      <label className="form-label" >
        Confirmation of new password *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formUserRetypePassword.control}
          as={<input />}
          className="form-input newpasswordconfirm form-field required"
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

export default UserRetypePasword;
