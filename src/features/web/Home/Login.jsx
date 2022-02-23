import { Fab } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { login, loginGoogle } from 'components/web/auth/userSlice';
import LoginForm from 'components/web/form/LoginForm';
import Google from 'icons/Google';
import { useSnackbar } from 'notistack';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CustomerSp from 'components/web/customerSupport/CustomerSp'
const Login = function () {
  const history = useHistory();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleLoginFormSubmit = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      history.push('/');
      window.location.reload();
    } catch (error) {
      console.log('Failed to login:', error);
      enqueueSnackbar("Mật khẩu hoặc tài khoản không chính xác", { variant: 'error' });
      // history.push('/login');
      // localStorage.clear();
      // window.location.reload();
    }
  };
  const responseGoogleSuccess = async (response) => {
    const data = { tokenId: response.tokenId };
    const action = loginGoogle(data);
    const resultAction = await dispatch(action);
    unwrapResult(resultAction);
    history.push('/');
    window.location.reload();
  };
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div>
      {/* Body */}
      <div className="pt_storefront" id="wrapper">
        <div id="minicart-container" aria-hidden="true" />
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
                  <span className="subtitle">My account</span> <span className="title">Login</span>
                </h1>
              </div>
              <div className="row">
                <div className="col-xs-6">
                  <div className="login-box">
                    <h2>Homie Family Member</h2>
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
                    <p className="intro">If you are already a Homie Family member, please enter your login information.</p>
                    {/* <div className="error">
                      ${click}
                    </div> */}
                    <LoginForm onSubmit={handleLoginFormSubmit} />
                  </div>
                </div>
                <div className="col-xs-6">
                  <div className="register-box">
                    <h2>New member</h2>
                    <p className="intro">Create your personal account to join our Homie family.</p>
                    <a href="/register" className="form-row">
                      <button type="submit" value="Create an account" name="dwfrm_login_register">
                        Create an account
                      </button>
                    </a>
                    <div className="create-account-benefits">
                      <h3>Benefits</h3>
                      <div className="content-asset">
                        <p className="title">Wishlist</p>
                        <p className="text">Create a wish list and share it with loved ones or in-store consultants</p>
                        <p className="title">Customization</p>
                        <p className="text">Take advantage of suggestions for customized products and exclusive content</p>
                        <p className="title">Preferences</p>
                        <p className="text">Manage your newsletter subscription preferences</p>
                        <p className="title">Personal details</p>
                        <p className="text">Update your personal information</p>
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
      {/* end body */}
    </div>
  );
};

export default Login;
