import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from './inputCommon/inputText';

LoginFormHeader.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginFormHeader(props) {
  const schema = yup.object().shape({
    email_header: yup.string().required('The e-mail address is invalid').email(),
    password_header: yup.string().required('Please enter a password containing at least 8 characters, with 1 number and 1 uppercase letter').min(5, 'title'),
  });
  const form = useForm({
    defaultValues: {
      email_header: '',
      password_header: '',
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  return (
    <form className="clearfix " name="login-form" onSubmit={form.handleSubmit(handleSubmit)} id="form-3">
      <fieldset>
        <Input name="email_header" form={form} label="Địa chỉ email *" />
        <Input name="password_header" form={form} isPassword={true} label="Mật khẩu *" />
        <div className="form-row form-row-button">
          <button type="submit" className="form-button" value="Login" name="dwfrm_login_login">
            Login
          </button>
        </div>
        <div className="login-actions">
          <div className="form-row form-customCheckbox remember-me">
            <input type="checkbox" id="remember-me-header" className="form-checkbox" />
            <label htmlFor="remember-me-header" className="form-label">
              Remember me
            </label>
          </div>
          <a className="password-reset" href>
            Quên mật khẩU?
          </a>
          <a className="create-account" href="/register">
            Chưa có tài khoản?
          </a>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginFormHeader;
