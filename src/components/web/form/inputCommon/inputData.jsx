import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

UserEmail.propTypes = {
  userEmail: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  formUserEmail: PropTypes.object.isRequired,
};

function UserEmail(props) {
  const { userEmail,formUserEmail, name } = props;
  return (
    <div className="form-row required" data-requiredtext="Please enter your e-mail address (format: email@domain.fr)" data-regexinvalidmessage aria-required="true">
      <label className="form-label" htmlFor="dwfrm_profile_customer_email">
        E-mail address *
      </label>
      <div className="form-field">
        
        <Controller
          className="form-input email form-field required"
          control={formUserEmail.control}
          type="text"
          id="dwfrm_profile_customer_email"
          name={name}
          defaultValue={userEmail.email}
          maxLength={50}
          data-dwname="email"
          disabled="disabled"
          aria-required="true"
        />
      </div>
    </div>
  );
}

export default UserEmail;
