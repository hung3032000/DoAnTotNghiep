import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserPhone.propTypes = {
  formUserPhone: PropTypes.object.isRequired,
  userPhone: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

function UserPhone(props) {
  const { formUserPhone,userPhone, name } = props;
  // const { errors, formState } = formUserPhone;
    return (
      <div
      className={`form-row lastname required empty ${userPhone ? 'focus' : ''}`}
      data-requiredtext="Please enter your last name (A-Z, a-z, dash, apostrophe and space accepted)"
    >
      <label className="form-label" htmlFor="dwfrm_profile_customer_lastname_d0nvjfwfdkjp">
        Telephone
      </label>
        <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formUserPhone.control}
          as={<input />}
          className="form-input lastname form-field required"
          type="text"
          defaultValue={userPhone}
          maxLength={13}

        />

      </div>  </div>
    );
}

export default UserPhone;