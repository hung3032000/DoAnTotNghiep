import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputData.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  form: PropTypes.object.isRequired,
};

function InputData(props) {
  const { defaultValue, form, name } = props;
  return (
    <Controller
      control={form.control}
      type="text"
      name={name}
      defaultValue={defaultValue}
    />
  );
}

export default InputData;
