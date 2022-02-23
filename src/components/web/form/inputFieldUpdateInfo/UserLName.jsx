import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserLName.propTypes = {
  userLName: PropTypes.string.isRequired,

  formUserLName: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserLName(props) {
  const { formUserLName, userLName, name } = props;
  return (
    <div
      className={`form-row lastname required empty ${userLName ? 'focus' : ''}`}
      data-requiredtext="Please enter your last name (A-Z, a-z, dash, apostrophe and space accepted)"
      data-regexinvalidmessage
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_profile_customer_lastname_d0nvjfwfdkjp">
        Last name *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formUserLName.control}
          as={<input />}
          className="form-input lastname form-field required"
          type="text"
          defaultValue={userLName}
          maxLength={13}
        />
      </div>
    </div>
  );
}

export default UserLName;
