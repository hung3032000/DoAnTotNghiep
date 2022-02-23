import React from 'react';
// import PropTypes from 'prop-types';

// CustomerSp.propTypes = {};

function CustomerSp(props) {
  return (
    <div className="customer-support">
      <div className="content-asset">
        <div className="title">Cần giúp hôm?</div>
        <div className="container">
          <div className="text">
            <p className="subtitle">Client Services</p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit
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
  );
}

export default CustomerSp;
