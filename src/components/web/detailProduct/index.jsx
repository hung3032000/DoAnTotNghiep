import React from 'react';
import './style.css';

function index(props) {
  return (
    <div class="dialog-content ui-dialog-content ui-widget-content test3">
      <div class="container-description">
        <div class="short-description">
          <ul>
            <li>Loose-fitting Bermuda shorts in denim with raised 4G motif.</li>
            <li>Leg bottoms with raw edges.</li>
            <li>Metal GIVENCHY barrette closure.</li>
            <li>Two pockets on the sides.</li>
            <li>Two patch pockets and one hidden pocket on the back.</li>
          </ul>
        </div>

        <button class="btn btn-link-secondary button-text size-guide size-guide-panel-btn" type="button">
          Size guide
        </button>
        <dl class="table-brand">
          <div class="product-dl-item">
            <dt>Color</dt>
            <dd class="color-value">BLUE/WHITE</dd>
          </div>
          <div class="product-dl-item">
            <dt>Composition</dt>
            <dd>
              <p>100% cotton.</p>
            </dd>
          </div>
          <div class="product-dl-item">
            <dt>Care</dt>
            <dd>
              <ul>
                <li>Maximum wash 30°C, delicate cycle</li>
                <li>Iron at maximum soleplate temperature (110°C) without steam</li>
                <li>Do not tumble dry</li>
                <li>Do not bleach</li>
                <li>Dry clean using perchlorethylene and hydrocarbons, delicate cycle</li>
              </ul>
            </dd>
          </div>
          <div class="product-dl-item">
            <dt>Country of origin</dt>
            <dd>Tunisia</dd>
          </div>
          <div class="product-dl-item sku">
            <dt>Product code</dt>
            <dd class="pid" itemprop="sku">
              BM512S5Y31-490
            </dd>
          </div>
        </dl>

        <div class="text">
          <h2>Customer services</h2>
          <p>Our team is available Monday to Saturday from 10:00 am to 7:00 pm (CET Paris time) to answer your questions in French, English, or Italian.</p>
        </div>
        <div class="links">
          <a class="mail-to-button" href="mailto:contact@givenchy.com">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}

export default index;
