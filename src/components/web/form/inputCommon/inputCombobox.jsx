import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

InputCombobox.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  dataForm: PropTypes.any,
};

function InputCombobox(props) {
  const { form, name, label, dataForm } = props;

  const [value, setValue] = useState();
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={`form-row  required form-row-select`}>
      {/* ${hasErrors ? 'form-row--error' : ''} */}
      <div className="form-field-wrapper">
        <label className="form-label">{label}</label>
        <div className="form-field">
          <div className="form-select-wrapper">
            <Controller
              name={name}
              control={form.control}
              as={
                <select className="form-select  form-field required" id={name} name={name} title={name} onChange={handleOnChange} value={value} required>
                  <option className="hidden" value="">
                    {label}
                  </option>
                  {dataForm.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputCombobox;
