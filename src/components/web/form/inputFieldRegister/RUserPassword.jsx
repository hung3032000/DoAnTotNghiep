import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

RUserPassword.propTypes = { formRUserPassword: PropTypes.object.isRequired, name: PropTypes.string.isRequired };

function RUserPassword(props) {
  const { formRUserPassword, name } = props;
  const { errors, formState } = formRUserPassword;
  const hasErrors = formState.touched[name] && errors[name];

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <div
      className={`form-row password form-auto required empty ${hasErrors ? 'form-row--error' : ''}`}
      data-requiredtext="Please enter your password"
      data-regexinvalidmessage
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_login_password_d0vayssxmnwj">
        Password *
      </label>

      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formRUserPassword.control}
          as={<input />}
          className="form-input password form-field required empty"
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

export default RUserPassword;
