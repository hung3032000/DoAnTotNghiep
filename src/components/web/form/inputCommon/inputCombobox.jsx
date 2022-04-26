import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

InputCombobox.propTypes = {
  formRUserTitle: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function InputCombobox(props) {
  const { formRUserTitle, name } = props;
  // const { errors, formState } = formRUserTitle;
  // const hasErrors = formState.touched[name] && errors[name];
  const categoryOptions = [
    { label: 'Ông', value: 'Male' },
    { label: 'Bà', value: 'Female' },
  ];
  return (
    <div className={`form-row  required form-row-select`}>
     {/* ${hasErrors ? 'form-row--error' : ''} */}
     
      <div className="form-field-wrapper">
        <label className="visually-hidden" htmlFor="dwfrm_profile_customer_title">
          Title *
        </label>
        <div className="form-field">
          <div className="form-select-wrapper">
            <Controller
              name={name}
              control={formRUserTitle.control}
              as={
                <select
                  className="form-select title form-field required"
                  id="dwfrm_profile_customer_title"
                  name={name}
                  data-dwname="title"
                  title="Title"
                  autoComplete="honorific-prefix"
                  aria-required="true"
                >
                 <option className="hidden" >
                 Tiltle
                    </option>
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
