import React from 'react';
import NavUser from 'components/web/NavUserPage/NavUser';
import CustomerSp from 'components/web/customerSupport/CustomerSp';
const Cartlist = function (props) {
  return (
    <div>
      {/* Body */}
      <main id="main" className="page-content clearfix" style={{ marginTop: '128px' }}>
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="container">
          <NavUser />
        </div>
        <div id="primary" className="primary-content">
          <div className="account-overview">
            <div className="page-header">
              <h1>
                <span className="subtitle">My account</span> <span className="title">Overview</span>
              </h1>
            </div>
            <div className="container account-overview-infos">
              <div className="col-sm-offset-3 col-xs-6 wishlist-overview grid-tile tiles-container">
                <div className="area-title">Mục yêu thích</div>
                Mục yêu thích trống
                <div className="form-row form-row-button">
                  <a className="form-button" href="/us/en-US/wishlist">
                    Xem mục yêu thích
                  </a>
                </div>
              </div>
            </div>
          </div>
          <CustomerSp/>
        </div>
      </main>
      {/* end body */}
    </div>
  );
};

export default Cartlist;
