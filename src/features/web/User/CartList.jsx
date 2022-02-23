import React from 'react';
import NavUser from 'components/web/NavUserPage/NavUser';
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
                <div className="area-title">Wishlist</div>
                Your wishlist is empty
                <div className="form-row form-row-button">
                  <a className="form-button" href="/us/en-US/wishlist">
                    See my wishlist
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="customer-support">
            <div className="content-asset">
              <div className="title">Cần giúp hôm?</div>
              <div className="container">
                <div className="text">
                  <p className="subtitle">Client Services</p>
                  Phục vụ từ 10h sáng đến 3h đêm nha mấy cưng
                </div>
                <div className="links">
                  <a href="/#" className="contact-popin">
                    <i className="icon_Email" />
                    Email
                  </a>
                  <a href="tel:0929363511" className="call-to-button">
                    <i className="icon_Call" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* end body */}
    </div>
  );
};

export default Cartlist;
