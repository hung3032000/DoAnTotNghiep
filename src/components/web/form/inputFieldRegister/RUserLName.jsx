import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserLName.propTypes = {
  formRUserLName: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserLName(props) {
  const { formRUserLName, name } = props;
  const { errors, formState } = formRUserLName;
  const hasErrors = formState.touched[name] && errors[name];
  return (
    <div
      className={`form-row lastname required empty ${hasErrors ? 'form-row--error' : ''}`}
      data-requiredtext="Please enter your last name (A-Z, a-z, dash, apostrophe and space accepted)"
      data-regexinvalidmessage
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_profile_customer_lastname_d0jfiuibdzot">
        Last name *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formRUserLName.control}
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

export default UserLName;
