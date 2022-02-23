import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

UserPassWord.propTypes = {
  formPassword: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserPassWord(props) {
  const { formPassword, name } = props;
  const { errors, formState } = formPassword;
  const hasErrors = errors[name] && formState.touched[name];

  return (
    <div className="form-group">
      <div className={`form-row password form-auto required  empty ${hasErrors ? 'form-row--error' : ''}`}>
        <label className="form-label" htmlFor={name}>
          Password *
        </label>
        <div className="form-field">
          <Controller
            name={name}
            id={name}
            control={formPassword.control}
            as={<input />}
            className="form-input password form-field required"
            type="password"
          />

          <span className="error"></span>
          {hasErrors && <span className="error">{errors[name]?.message}</span>}
        </div>
      </div>
    </div>
  );
}

export default UserPassWord;
