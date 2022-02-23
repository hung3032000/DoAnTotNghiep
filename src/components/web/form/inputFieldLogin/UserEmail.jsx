import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
UserEmail.propTypes = {
  formEmail: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserEmail(props) {
  const { formEmail, name } = props;
  const { errors, formState } = formEmail;
  const hasErrors = formState.touched[name] && errors[name];

  return (
    <div className="form-group">
      <div className={`form-row form-auto required empty ${hasErrors ? 'form-row--error' : ''}`}>
        {/* ${hovered ? 'focus' : 'empty'}` */}
        {/* form-row--valid */}
        {/* form-row--error */}
        <label className="form-label" htmlFor={name}>
          E-mail address *
        </label>
        <div className="form-field">
          <Controller
            name={name}
            id={name}
            control={formEmail.control}
            as={<input />}
            className="form-input username form-field required"
            type="text"
            maxLength={50}
          />
          <span className="error" style={{ top: '3px' }}>
            {hasErrors && <span className="format">
            (format: email@domaine.fr)
            </span>}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserEmail;
