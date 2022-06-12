import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from './inputCommon/inputText';
LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

function LoginForm(props) {
  const schema = yup.object().shape({
    email: yup.string().required('Email không hợp lệ').email(),
    password: yup.string().required('Mật khẩu không hợp lệ').min(5, 'title'),
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
    }
  };

  return (
    <form className="clearfix " onSubmit={loginForm.handleSubmit(handleSubmit)}>
      <fieldset>
        <Input name="email" form={loginForm} label="Địa chỉ email *" />
        <Input name="password" form={loginForm} isPassword={true} label="Mật khẩu *" />
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
  );
}

export default LoginForm;
