import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

InputCombobox.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function InputCombobox(props) {
  const { form, name } = props;
  // const { errors, formState } = formRUserTitle;
  // const hasErrors = formState.touched[name] && errors[name];
  const categoryOptions = [
    { label: 'Ông', value: 'Male' },
    { label: 'Bà', value: 'Female' },
  ];
  const [value, setValue] = useState();
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={`form-row  required form-row-select`}>
      {/* ${hasErrors ? 'form-row--error' : ''} */}

      <div className="form-field-wrapper">
        <label className="form-label">Ông/Bà</label>
        <div className="form-field">
          <div className="form-select-wrapper">
            <Controller
              name={name}
              control={form.control}
              as={
                <select className="form-select  form-field required" id={name} name={name} title={name} onChange={handleOnChange} value={value}>
                  <option className="hidden">Ông/Bà</option>
                  {categoryOptions.map((tc, index) => (
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
