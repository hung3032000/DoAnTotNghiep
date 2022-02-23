import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

CheckOutFName.propTypes = {
  formCheckOutFName: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function CheckOutFName(props) {
  const { formCheckOutFName, name } = props;
  return (
    <div
      className="form-row required empty     focus" //<c:if test=" fname!="null" }">
      data-requiredtext=""
      data-regexinvalidmessage=""
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_singleshipping_shippingAddress_shippingAddressFields_firstname">
        First name *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formCheckOutFName.control}
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

export default CheckOutFName;
