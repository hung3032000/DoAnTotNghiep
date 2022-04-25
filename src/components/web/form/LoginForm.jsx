import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import UserEmail from './inputFieldLogin/UserEmail';
import UserPassWord from './inputFieldLogin/UserPassWord';
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    email: yup.string().required('The e-mail address is invalid').email(),
    password: yup.string().required('Please enter a password containing at least 8 characters, with 1 number and 1 uppercase letter'),
  });

  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
      console.log(values);
    }
  };

  return (
    <div>
      <form className="clearfix " onSubmit={loginForm.handleSubmit(handleSubmit)}>
        <fieldset>
          <legend className="visually-hidden">Login</legend>
          <UserEmail name="email" formEmail={loginForm} />
          <UserPassWord name="password" formPassword={loginForm} />
          <div className="form-row form-row-button">
            <button type="submit" className="form-button" name="dwfrm_login_login">
              Đăng nhập
            </button>
          </div>
          <div className="login-actions">
            <a className="password-reset" href>
              Quên mật khẩu?
            </a>
            <div className="form-row form-customCheckbox remember-me">
              <input type="checkbox" id="remember-me" className="form-checkbox" />
              <label htmlFor="remember-me" className="form-label">
                Duy trì đăng nhập
              </label>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default LoginForm;
