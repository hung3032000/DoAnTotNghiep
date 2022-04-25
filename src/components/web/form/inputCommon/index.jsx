import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

index.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function index(props) {
  const { form, name, label } = props;
  const { errors, formState } = form;
  const hasErrors = formState.touched[name] && errors[name];
  return (
    <div className={`form-row required empty ${hasErrors ? 'form-row--error' : ''}`}>
      <label className="form-label">{label}</label>
      <div className="form-field">
        <Controller
          name={name}
          id={name}
          control={form.control}
          as={<input />}
          className="form-input form-field required"
          type="text"
          maxLength={50}
        />
      </div>
    </div>
  );
}

export default index;
