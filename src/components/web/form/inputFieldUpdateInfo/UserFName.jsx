import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserFName.propTypes = {
  userFName: PropTypes.string.isRequired,
  formUserFName: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserFName(props) {
  const { formUserFName,userFName, name } = props;
  return (
    <div
      className={`form-row firstname required empty ${userFName ? 'focus' : ''}`}
      data-requiredtext="Please enter your first name (A-Z, a-z, dash, apostrophe and space accepted)"
      data-regexinvalidmessage
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_profile_customer_firstname_d0hhfdpzzeru">
        First name *
      </label>
      <div className="form-field">
      <Controller
          name={name}
          id={name}
          control={formUserFName.control}
          as={<input />}
          className="form-input lastname form-field required"
          type="text"
          defaultValue={userFName}
          maxLength={13}
          data-dwname="lastname"
          autoComplete="family-name"
          aria-required="true"

        />
      </div>
    </div>
  );
}

export default UserFName;
