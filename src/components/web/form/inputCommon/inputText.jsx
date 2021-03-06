import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputText.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  isPassword: PropTypes.bool,
  defaultValue: PropTypes.string,
  isDisable: PropTypes.bool,
  className: PropTypes.string,
};

function InputText(props) {
  const { form, name, label, isPassword, defaultValue, placeholder, className } = props;
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
    <>
      <div className={className ? className : `form-row required empty ${defaultValue ? 'focus' : ''} ${hasErrors ? 'form-row--error' : ''}`}>
        <label className="form-label">{label}</label>
        <div className="form-field">
          <Controller
            name={name}
            control={form.control}
            as={<input required/>}
            className="form-input form-field required"
            type={showPassword(isPassword)}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
          <span className="error"></span>
          {isPassword ? (
            <i className="password-show" onClick={togglePasswordVisiblity}>
              {passwordShown ? 'Ẩn' : 'Hiện'}
            </i>
          ) : (
            ''
          )}
          {hasErrors && <span className="error">{errors[name]?.message}</span>}
        </div>
      </div>
    </>
  );
}

export default InputText;
