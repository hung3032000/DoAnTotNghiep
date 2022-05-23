import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

Index.propTypes = {
    
};

function Index(props) {
  return (
    <>
      <div className="form-row-search placeholder">
        <div className="form-field-wrapper">
          <div className="form-field">
            <input classNameName="form-input topSearch-field" placeholder="Nhập mã giảm giá" title="Nhập mã giảm giá"></input>
            {/* <Controller
              name={name}
              id={name}
              control={form.control}
              as={<input />}
              classNameName="form-input topSearch-field"
              type="text"
              maxLength={50}
              placeholder="Search by keyword, style etc"
              title="Enter search words"
            /> */}
          </div>
        </div>
        <button className="btn btn-link" type="submit">
          {/* disabled="disabled" */}
          Áp dụng
        </button>
      </div>
      <div class="field-wrapper">
        <div class="address-element not-instore address-selected">
          <button class="edit-addressdelivery">Edit</button>
          <p>Mrs. HUNG PHAM</p>
          <p>484 lê văn việt, tăng nhơn phú a,q9(Ktx đh spkt)</p>
          <p>QUẬN 9 68000</p>
          <p>+84929363511</p>
        </div>
      </div>
    </>
  );
}

export default Index;
