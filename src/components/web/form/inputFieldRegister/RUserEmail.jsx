import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

RUserEmail.propTypes = {
  formRUserEmail: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function RUserEmail(props) {
  const { formRUserEmail, name } = props;
  const { errors, formState } = formRUserEmail;
  const hasErrors = formState.touched[name] && errors[name];

  return (
    <div className={`form-row form-auto required empty ${hasErrors ? 'form-row--error' : ''}`}>
      <label className="form-label" htmlFor="dwfrm_profile_customer_email">
        E-mail address *
      </label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={formRUserEmail.control}
          as={<input />}
          className="form-input email form-field required"
          type="text"
          maxLength={50}
          data-dwname="email"
          autoComplete="email"
        />
        <span id="dwfrm_profile_customer_email-error" className="error" />
      </div>
    </div>
  );
}

export default RUserEmail;
