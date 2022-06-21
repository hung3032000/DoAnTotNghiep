import React from 'react';
function CustomerSp(props) {
  return (
    <div className="customer-support">
      <div className="content-asset">
        <div className="title">Cần giúp đỡ?</div>
        <div className="container">
          <div className="text">
            <p className="subtitle">Tổng đài dịch vụ</p>
            Đội ngũ hỗ trợ sẵn sàng từ thứ 2 đến thứ 7 từ 10:00 sáng đến 7:00 tối để trả lời tất cả các thắc mắc của khách hàng.
          </div>
          <div className="links">
            <a href="/#" className="contact-popin">
              <i className="icon_Email" />
              Email
            </a>
            <a href="tel:0929363511" className="call-to-button">
              <i className="icon_Call" />
              Điện thoại
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerSp;
