import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

CheckOutPhone.propTypes = {
    formCheckOutPhone: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

function CheckOutPhone(props) {
    
  const { formCheckOutPhone, name } = props;
    return (
        <div className="form-row required empty" data-requiredtext data-regexinvalidmessage aria-required="true">
        <label className="form-label" htmlFor="dwfrm_singleshipping_shippingAddress_shippingAddressFields_lastname">
          Start typing your phone*
        </label>
        <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formCheckOutPhone.control}
          as={<input />}
          className="form-input lastname form-field required"
          type="text"
          defaultValue=""
          maxLength={13}
          data-dwname="lastname"
          autoComplete="family-name"
          aria-required="true"

        />
        </div>
      </div>
    );
}

export default CheckOutPhone;