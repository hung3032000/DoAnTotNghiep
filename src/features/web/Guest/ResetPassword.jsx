import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import ChangePassForm from 'components/web/form/ChangePassForm';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { confirmResetPassword } from 'slice/userSlice';
function ResetPassword() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  const token = location.pathname.substring(16);
  const handleResFormSubmitPass = async (values) => {
    try {
      setLoading(true);
      values.token = token;
      const action = confirmResetPassword(values);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
      //   enqueueSnackbar('Cập nhập thông tin cá nhân thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader showLoader={loading} />
      <Helmet>
        <title>Quản lý thông tin cá nhân</title>
      </Helmet>
      <main id="main" className="page-content clearfix" style={{ marginTop: '128px' }}>
        <div className="cart-live-region" aria-live="polite" role="status"></div>

        <div id="primary" className="primary-content">
          <div className="registration container">
            <div className="page-header">
              <h1>
                <span className="subtitle">Thay đổi thông tin</span> <span className="title">Thông tin cá nhân</span>
              </h1>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-offset-3">
                <ChangePassForm onSubmit={handleResFormSubmitPass} reset={true} />
              </div>
            </div>
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
}

export default ResetPassword;
