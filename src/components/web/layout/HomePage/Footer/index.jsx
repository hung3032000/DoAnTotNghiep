import React from 'react';

const Footer = function (props) {
  return (
    <>
      {/* footer */}
      <footer className="footer">
        <div className="footer-slot-duo">
          <div className="container">
            <div className="row ">
              <div className="col-xs-6 col-sm-6 col-lg-6 advantage-part">
                <div>
                  <h2>Lợi ích của E-boutique</h2>
                </div>
                <div className="content-asset">
                  <div className="row">
                    <p className="col-xs-2 col-sm-4 col-lg-4">
                      <i className="icon_freeDelivery" />
                      Miễn phí
                      <br />
                      vận chuyển
                    </p>
                    <p className="col-xs-2 col-sm-4 col-lg-4">
                      <i className="icon_collect-in-store" />
                      Mua
                      <br />
                      tại cửa hàng
                    </p>
                    <p className="col-xs-2 col-sm-4 col-lg-4">
                      <i className="icon_complimentaryGiftWrapping" />
                      hỗ trợ <br />
                      gói quà
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-lg-6 newsletter-part">
                <form action="/#Newsletter-Edit" method="POST" className="newsletter-form">
                  <div>
                    <h2>Đăng kí để nhận những tin tức mới nhất và kết nối đến cộng đồng Hermes</h2>
                    <p>Trở thành người đầu tiên biết đến những bộ collections và event mới nhất.</p>
                  </div>
                  <div>
                    <div className="content-asset">
                      <p className="terms-conditions">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. <a href="/#">Privacy Policy</a> Lorem ipsum dolor sit amet, consectetur adip
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-4 col-sm-8 col-lg-8 input-container">
                      <div className="form-row  required focus " data-requiredtext data-regexinvalidmessage >
                        <div className="form-field-wrapper">
                          <label className="form-label" htmlFor="dwfrm_newsletter_email">
                          Địa chỉ E-mail *
                          </label>
                          <div className="form-field">
                            <input
                              className="form-input email form-field required"
                              type="text"
                              id="dwfrm_newsletter_email"
                              name="dwfrm_newsletter_email"
                              defaultValue=""
                              maxLength={50}
                              data-dwname="email"
                              autoComplete="email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xs-2 col-sm-4 col-lg-4 input-container">
                      <div className="form-row submit">
                        <button type="submit" value="Subscribe" name="dwfrm_newsletter_subscribe">
                          Đăng kí
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="services">
          <div className="container">
            <div className="row">
              <div className="col col-md-2 col-sm-6">
                <span className="footer-title">Dịch vụ khách hàng</span>
                <ul>
                  <li>
                    <a href="/#">FAQ</a>
                  </li>
                  <li>
                    <a href="/#">FAQ COVID </a>
                  </li>
                </ul>
              </div>
              <div className="col col-md-2 col-sm-6">
                <span className="footer-title">Về chúng tôi</span>
                <ul>
                  <li>
                    <a href="/#">Careers</a>
                  </li>
                  <li>
                    <a href="/#">Press</a>
                  </li>
                </ul>
              </div>
              <div className="col col-md-5 col-sm-6">
                <span className="footer-title">Pháp lý</span>
                <ul>
                  <li>
                    <a href="/#">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a href="/#">Chính sách Cookie</a>
                  </li>
                </ul>
              </div>
              <div className="col col-md-3 col-sm-3">
                <a className="HomieBeauty promotion-impression" data-promotion-creative="footer" href="/#" target="_blank">
                  <img alt="" src="/image/Parfum_Linterdit.jpg" title />
                  <span style={{ position: 'absolute', color: 'white', top: '50%', left: 0, width: '100%', textAlign: 'center', transform: 'translateY(-50%)' }}>
                    Hermes
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* end footer */}
    </>
  );
};

export default Footer;
