import React from 'react';
import PropTypes from 'prop-types';

CheckOutEmail.propTypes = {
  userEmail: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function CheckOutEmail(props) {
  
  const { userEmail, name } = props;
    return (
        <div className="form-row required" data-requiredtext data-regexinvalidmessage aria-required="true">
        <label className="form-label" htmlFor="dwfrm_singleshipping_profile_customer_email_d0rozvbtnbxp">
          E-mail address *
        </label>
        <div className="form-field">
        <input
          className="form-input email form-field required"
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

export default CheckOutEmail;