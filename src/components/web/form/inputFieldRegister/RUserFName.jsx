import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserFName.propTypes = {
  formRUserFName: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserFName(props) {
  const { formRUserFName, name } = props;
  const { errors, formState } = formRUserFName;
  const hasErrors = formState.touched[name] && errors[name];
  return (
    <div
      className={`form-row firstname required empty ${hasErrors ? 'form-row--error' : ''}`}
      data-requiredtext="Please enter your first name (A-Z, a-z, dash, apostrophe and space accepted)"
      data-regexinvalidmessage
      aria-required="true"
    >
      <label className="form-label" htmlFor="dwfrm_profile_customer_firstname_d0rewpwspxep">
        First name *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formRUserFName.control}
          as={<input />}
          className="form-input firstname form-field required"
          type="text"
          maxLength={13}
          data-dwname="firstname"
          autoComplete="given-name"
          aria-required="true"
        />
      </div>
    </div>
  );
}

export default UserFName;
