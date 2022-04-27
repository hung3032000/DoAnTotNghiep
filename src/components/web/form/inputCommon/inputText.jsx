import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputText.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
  defaultValue: PropTypes.string,
  isDisable : PropTypes.bool
};

function InputText(props) {
  const { form, name, label, isPassword,defaultValue } = props;
  const { errors, formState } = form;
  const hasErrors = formState.touched[name] && errors[name];
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  function showPassword(isPassword) {
    if (isPassword) {
      return passwordShown ? 'text' : 'password';
    }
    return isPassword ? 'password' : 'text';
  }
  return (
    <div className="form-group">
      <div className={`form-row required empty ${hasErrors ? 'form-row--error' : ''}`}>
        <label className="form-label">{label}</label>
        <div className="form-field">
          <Controller name={name} id={name} control={form.control} as={<input />} className="form-input form-field required" type={showPassword(isPassword)} maxLength={50} defaultValue={defaultValue}/>
          <span className="error"></span>
          {isPassword ? (
            <i className="password-show" onClick={togglePasswordVisiblity}>
              {passwordShown ? 'Hide' : 'Show'}
            </i>
          ) : (
            ''
          )}
          {hasErrors && <span className="error">{errors[name]?.message}</span>}
        </div>
      </div>
    </div>
  );
}

export default InputText;
