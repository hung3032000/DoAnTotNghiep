import React from 'react';
import PropTypes from 'prop-types';

Slice.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string

};

function Slice(props) {
  const { imageUrl, title } = props;
  return (
    <div aria-roledescription="slide" className="swiper-slide">
      <div className="image-content">
        <div className="background">
          <img src={imageUrl}  alt="dd b" />
        </div>
        <a className="content" href="/#">
          <div className="primary">
            <div className="primary">
              <span style={{ color: '/#FFFFFF' }}>{title}</span>
            </div>
            <div className="cta-container">
              <p className="form-button look-button">SHOP NOW</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

export default Slice;
