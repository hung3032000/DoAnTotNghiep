import { Fab } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { login, loginGoogle } from 'slice/userSlice';
import LoginForm from 'components/web/form/LoginForm';
import Google from 'icons/Google';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import Loader from 'components/fullPageLoading';

import { Helmet } from 'react-helmet';
const Login = function () {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  const { enqueueSnackbar } = useSnackbar();

  const handleLoginFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar('Mật khẩu hoặc tài khoản không chính xác', { variant: 'error' });
      // history.push('/login');
      // window.location.reload();
    } finally {
      setLoading(false);
    }
  };
  const responseGoogleSuccess = async (response) => {
    try {
      setLoading(true);
      const data = { tokenId: response.tokenId };
      const action = loginGoogle(data);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Tài khoản đã bị vô hiệu hoá", { variant: 'error' });
    }finally {
      setLoading(false);
    }

  };
  const responseGoogle = (response) => {
    try {
      setLoading(true);
      console.log(response.error);
      enqueueSnackbar(response.error, { variant: 'error' });
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }

  };
  return (
    <div>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <Loader showLoader={loading} />
      <div className="pt_storefront" id="wrapper">
        
        <main id="main" className="page-content clearfix" style={{ marginTop: '128px' }}>
          <div id="primary" className="primary-content">
            <div className="login-page container">
              {/* <div className="account-edit-success">
                <i className="icon_CheckMark"></i>
                <span role="alert">
                  ${'{'}message2{'}'}
                </span>
              </div> */}
              <div className="page-header">
                <h1>
                  <span className="subtitle">Tài khoản</span> <span className="title">Đăng nhập</span>
                </h1>
              </div>
              <div className="row">
                <div className="col-xs-6">
                  <div className="login-box">
                    <h2>Thành viên của Hermes</h2>
                    <GoogleLogin
                      clientId="907790633444-0fnqh5mpf12k1jfes1pal08gv51vhnsh.apps.googleusercontent.com"
                      buttonText="Login"
                      render={(renderProps) => (
                        <Fab className="mgr-10" color="primary" aria-label="edit" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                          <Google />
                        </Fab>
                      )}
                      onSuccess={responseGoogleSuccess}
                      onFailure={responseGoogle}
                      cookiePolicy={'single_host_origin'}
                    />
                    <p className="intro">Nếu bạn là một thành viên của Hermes, hãy đăng nhập với thông tin của bạn.</p>
                    {/* <div className="error">
                      ${click}
                    </div> */}
                    <LoginForm onSubmit={handleLoginFormSubmit} />
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="register-box">
                    <h2>Thành viên mới</h2>
                    <p className="intro">Tạo một tài khoản cho riêng mình để tham gia cùng hermes.</p>
                    <a href="/register" className="form-row">
                      <button type="submit" value="Create an account" name="dwfrm_login_register">
                        Tạo tài khoản mới
                      </button>
                    </a>
                    <div className="create-account-benefits">
                      <h3>Lợi ích</h3>
                      <div className="content-asset">
                        <p className="title">Wishlist</p>
                        <p className="text">Create a wish list and share it with loved ones or in-store consultants</p>
                        <p className="title">Cá nhân hoá</p>
                        <p className="text">Take advantage of suggestions for customized products and exclusive content</p>
                        <p className="title">Yêu thích</p>
                        <p className="text">Quản lý những tin tức mới nhất mà mình yêu thích</p>
                        <p className="title">Thông tin cá nhân</p>
                        <p className="text">Cập nhập thông tin cá nhân</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CustomerSp />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
