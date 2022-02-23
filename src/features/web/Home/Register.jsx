import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'components/web/auth/userSlice';
import RegisterForm from 'components/web/form/RegisterForm';
import React from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import CustomerSp from 'components/web/customerSupport/CustomerSp';

const Register = function (props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const handleResFormSubmit = async (values) => {
    try {
      // values.username = values.email;
      console.log(values)
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Đăng kí thành công', { variant: 'success' });
      history.push('/myaccount');
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });

    }
  };
  return (
    <div>
      {/* Body */}

      <main id="main" className="page-content clearfix" style={{ marginTop: '128px' }}>
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div id="primary" className="primary-content">
          <div className="registration container">
            <div className="page-header">
              <h1>
                <span className="subtitle">Create an account</span> <span className="title">My account</span>
              </h1>
              <p className="text">Be the first to know about new collections and exclusive events through your personal account.</p>
            </div>

            {/* <div className="error">
              ${'{'}message{'}'}
            </div> */}
            <div className="row">
              <div className="col-xs-6 col-sm-offset-3">
                <RegisterForm onSubmit={handleResFormSubmit} />
              </div>
            </div>
          </div>
        </div>
        <CustomerSp/>
      </main>
      {/* end body */}
    </div>
  );
};

export default Register;
