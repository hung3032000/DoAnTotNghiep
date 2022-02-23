import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

UserTiltle.propTypes = {
  userTiltle: PropTypes.string.isRequired,
  formUserTitle: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function UserTiltle(props) {

  const { formUserTitle,userTiltle, name } = props;

  const categoryOptions = [
    { label: '', value: '' },
    { label: 'Ông', value: 'Male' },
    { label: 'Bà', value: 'Female' },
  ];
  const [value, setValue] = useState(userTiltle); 
  const handleOnChange = (event) => {
    setValue( event.target.value );
  };
  return (
    <div className="form-row required form-row-select form-row--valid" data-requiredtext="Please enter your greeting" data-regexinvalidmessage aria-required="true">
      <div className="form-field-wrapper">
        <label className="visually-hidden" htmlFor="dwfrm_profile_customer_title">
          Title *
        </label>
        <div className="form-field">
          <div className="form-select-wrapper">
            <Controller
              name={name}
              control={formUserTitle.control}
              as={
                <select
                  className="form-select title form-field required"
                  defaultValue={value}
                  onChange={handleOnChange}
                  value={value}
                >
                  {categoryOptions.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              }
            />
            <span id="dwfrm_profile_customer_title-error" className="error" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserTiltle;
