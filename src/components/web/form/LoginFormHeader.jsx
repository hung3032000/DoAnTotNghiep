import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import UserEmail from './inputFieldLogin/UserEmail';
import UserPassWord from './inputFieldLogin/UserPassWord';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
        <legend className="visually-hidden">Login</legend>

        <UserEmail name="email_header" formEmail={form} />

        <UserPassWord name="password_header" formPassword={form} />

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
            <input className=" rememberme" type="hidden" name="dwfrm_login_rememberme" defaultValue="true" data-dwname="rememberme" />
          </div>
          <a className="password-reset" href>
            Forgotten password?
          </a>
          <a className="create-account" href="/register">
            Don't have an account?
          </a>
        </div>
      </fieldset>
    </form>
  );
}

export default LoginFormHeader;
