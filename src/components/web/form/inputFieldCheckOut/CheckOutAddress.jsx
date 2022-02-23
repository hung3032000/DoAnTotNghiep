import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

CheckOutAddress.propTypes = {
    formCheckOutAddress: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
};

function CheckOutAddress(props) {
    
  const { formCheckOutAddress, name } = props;
    return (
        <div
        className="form-row required empty focus" //<c:if test=" addres !="null" }">
        data-requiredtext=""
        data-regexinvalidmessage=""
        aria-required="true"
      >
        <label className="form-label" htmlFor="dwfrm_singleshipping_shippingAddress_shippingAddressFields_lastname">
          Start typing your address*
        </label>
        <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formCheckOutAddress.control}
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

export default CheckOutAddress;