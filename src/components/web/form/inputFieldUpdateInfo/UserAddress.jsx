import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserAddress.propTypes = {
  userAddress: PropTypes.string.isRequired,
  formUserAddress: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserAddress(props) {
  const { formUserAddress,userAddress, name } = props;
  return (
    <div
      className={`form-row lastname required empty ${userAddress ? 'focus' : ''}`}
      data-requiredtext="Please enter your last name (A-Z, a-z, dash, apostrophe and space accepted)"
      data-regexinvalidmessage
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_profile_customer_lastname_d0nvjfwfdkjp">
        Address *
      </label>
      <div className="form-field">
      <Controller
          name={name}
          id={name}
          control={formUserAddress.control}
          as={<input />}
          className="form-input lastname form-field required"
          type="text"
          defaultValue={userAddress}
          maxLength={13}
          data-dwname="lastname"
          autoComplete="family-name"
          aria-required="true"

        />
        
      </div>
    </div>
  );
}

export default UserAddress;
