import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

CheckOutTiltle.propTypes = {
  formCheckOutTitle: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function CheckOutTiltle(props) {
  const { formCheckOutTitle, name } = props;
  const categoryOptions = [
    { label: 'Tiltle', value: '' },
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mrs.', value: 'Mrs.' },
    { label: 'Ms.', value: 'Ms.' },
  ];
  return (
    <div className="form-row  required form-row-select" data-requiredtext data-regexinvalidmessage aria-required="true">
      <label className="visually-hidden" htmlFor="dwfrm_singleshipping_shippingAddress_shippingAddressFields_title">
        Title *
      </label>
      <div className="form-field">
        <div className="form-select-wrapper">
        <Controller
              name={name}
              control={formCheckOutTitle.control}
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
  );
}

export default CheckOutTiltle;
