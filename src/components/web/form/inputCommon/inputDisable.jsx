import React from 'react';
import PropTypes from 'prop-types';

inputDisable.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
};

function inputDisable(props) {
  const { label, name, defaultValue } = props;
  return (
    <div className="form-row required">
      <label className="form-label">{label}</label>
      <div className="form-field">
        <input
          className="form-input form-field required"
          type="text"
          id={name}
          name={name}
          defaultValue={defaultValue}
          disabled="disabled"
        />
      </div>
    </div>
  );
}
export default inputDisable;
