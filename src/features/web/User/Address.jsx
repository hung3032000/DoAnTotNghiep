import React, { useState } from 'react';
import NavUser from 'components/web/NavUserPage/NavUser';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
import { Helmet } from 'react-helmet';
import Loader from 'components/fullPageLoading';
import Modal from 'components/web/modal/modal';
import ModiffyAddress from 'components/web/form/ModifyAddress';

const AccountOverView = function (props) {
  const handleAddressFormSubmit = async (values) => {
    try {
      setLoading(true);
      console.log(values);
    } catch (error) {
      console.log('Failed to login:', error);
      // enqueueSnackbar('Mật khẩu hoặc tài khoản không chính xác', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Helmet>
        <title>Tổng quan tài khoản</title>
      </Helmet>

      <Loader showLoader={loading} />
      <main id="main" className="page-content clearfix" style={{ marginTop: '128px' }}>
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="container">
          <NavUser />
        </div>
        <div id="primary" className="primary-content">
          <div class="account-page">
            <div class="addresses-area" id="addresses">
              <div>
                <h1>
                  <span class="title">Quản lý địa chỉ</span>
                </h1>
              </div>
              <ul class="address-list">
                <li class="address-tile  default">
                  <div class="mini-address-title">
                    484 lê văn việt, tăng nhơn phú a,q9(Ktx đh spkt)
                    <h3 class="address-default">(Địa chỉ mặc định)</h3>
                  </div>
                  <div class="mini-address-name">PHAM HUNG</div>
                  <div class="mini-address-location">
                    <address>
                      484 lê văn việt, tăng nhơn phú a,q9(Ktx đh spkt)<br></br>
                      650000 QUẬN 9 <br></br>
                      Hồ Chí minHeight<br></br>
                      VN Telephone: +840929363511<br></br>
                    </address>
                  </div>

                  <Modal classNameModal={'anchor'} label={'Thay đổi'}>
                    <div class="address-popin">
                      <h1>Chỉnh sửa</h1>
                      <ModiffyAddress onSubmit={handleAddressFormSubmit} />
                    </div>
                  </Modal>

                  <Modal classNameModal={'anchor'} label={'Xoá'}>
                    Heelo
                  </Modal>
                </li>
                <li class="address-tile ">
                  <div class="mini-address-title">Quận 9</div>
                  <div class="mini-address-name">PHAM HUNG</div>
                  <div class="mini-address-location">
                    <address>
                      484 lê văn việt, tăng nhơn phú a,q9(Ktx đh spkt)<br></br>
                      650000 QUẬN 9 <br></br>
                      Hồ Chí minHeight<br></br>
                      VN Telephone: +840929363511<br></br>
                    </address>
                  </div>
                  <Modal classNameModal={'anchor'} label={'Thay đổi'}>
                    Heelo
                  </Modal>

                  <Modal classNameModal={'anchor'} label={'Xoá'}>
                    Heelo
                  </Modal>
                  <Modal classNameModal={'anchor'} label={'Choose a default address'}>
                    Heelo
                  </Modal>
                </li>
              </ul>
              <div class="form-row form-row-button">
                <Modal classNameModal={'address-create form-button btn btn-outline-primary'} label={'Tạo địa chỉ mới'}>
                  <div class="address-popin">
                    <h1>Tạo địa chỉ mới</h1>
                    <ModiffyAddress onSubmit={handleAddressFormSubmit} />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <CustomerSp />
        </div>
      </main>
    </>
  );
};

export default AccountOverView;
