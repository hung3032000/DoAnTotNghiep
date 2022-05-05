import React from 'react';
import './style.css';
// import PropTypes from 'prop-types';

// index.propTypes = {};

function index(props) {
  return (
    <div className="color-variation-swiper product-detail-modal">
      <h2>Colors</h2>
      <section className="attribute color-variation-swiper-container" aria-roledescription="carousel">
        <div className="value swiper-container">
          <div className="swatches color swiper-wrapper">
            <div className="selectable attrvalue swiper-slide" aria-roledescription="slide">
              <a
                href
                className="swatchanchor anchor"
                onClick={() => {
                  console.log('hello');
                }}
              >
                <img alt="Mini Antigona Sport bag in leather" />
                <div className="variation-infos">
                  <p className="variation-name">IVORY</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
      </section>
    </div>
  );
}

export default index;
