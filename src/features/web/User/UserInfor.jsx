import { unwrapResult } from '@reduxjs/toolkit';
import { ChangePassword, update } from 'components/web/auth/userSlice';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import ChangePassForm from 'components/web/form/ChangePassForm';
import UpdateInfoForm from 'components/web/form/UpdateInfoForm';
import NavUser from 'components/web/NavUserPage/NavUser';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
function UserInfor() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const handleResFormSubmit = async (values) => {
    try {
      setLoading(true);
      values.password = '123456';
      const action = update(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhập thông tin cá nhân thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleResFormSubmitPass = async (values) => {
    try {
      setLoading(true);
      const action = ChangePassword(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Cập nhập thông tin cá nhân thành công', { variant: 'success' });
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
        <div className="container">
          <NavUser />
        </div>
        <div id="primary" className="primary-content">
          <div className="registration container">
            <div className="page-header">
              <h1>
                <span className="subtitle">Thay đổi thông tin</span> <span className="title">Thông tin cá nhân</span>
              </h1>
            </div>
            <div className="row">
              <div className="col-xs-6 col-sm-offset-3">
                <UpdateInfoForm onSubmit={handleResFormSubmit} />
                <ChangePassForm onSubmit={handleResFormSubmitPass} />
              </div>
            </div>
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
}

export default UserInfor;
