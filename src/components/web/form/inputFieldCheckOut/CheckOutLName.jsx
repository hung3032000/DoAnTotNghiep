import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

CheckOutLName.propTypes = {
  formCheckOutLName: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function CheckOutLName(props) {
  const { formCheckOutLName, name } = props;
  return (
    <div
      className="form-row required empty  focus" //<c:if test=" lname!="null" }">
      data-requiredtext=""
      data-regexinvalidmessage=""
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_singleshipping_shippingAddress_shippingAddressFields_lastname">
        Last name *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formCheckOutLName.control}
          as={<input />}
          className="form-input lastname form-field required"
          type="text"
          defaultValue
          maxLength={13}
          data-dwname="lastname"
          autoComplete="family-name"
          aria-required="true"
        />
      </div>
    </div>
  );
}

export default CheckOutLName;
