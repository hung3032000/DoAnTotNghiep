import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import React, { useState } from 'react';
Index.propTypes = {
  form: PropTypes.object.isRequired,
  edit: PropTypes.any,
  editForm: PropTypes.any,
  widthCustome: PropTypes.number,
  max: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function Index(props) {
  const { form, name, label, edit, widthCustome, number, editForm,max } = props;
  const { errors } = form;
  const hasError = errors[name];
  const [value, setValue] = useState(edit);
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  const renderText = (onChange) => {
    if (editForm) {
      return (
        <TextField
          name={name}
          type={number ? 'number' : 'text'}
          InputProps={{ inputProps: { min: 1 ,max : max }}}
          fullWidth={true}
          label={label}
          onChange={handleOnChange}
          required
          value={value}
          variant="outlined"
          error={!!hasError}
          helperText={errors[name]?.message}
        />
      );
    }
    return (
      <TextField
        name={name}
        type={number ? 'number' : 'text'}
        InputProps={{ inputProps: { min: 1 ,max : max} }}
        fullWidth={true}
        label={label}
        onChange={onChange}
        required
        value={value}
        variant="outlined"
        error={!!hasError}
        helperText={errors[name]?.message}
      />
    );
  };

  const width = widthCustome === undefined ? 6 : widthCustome;
  return (
    <Grid item md={width} xs={12}>
      <Controller name={name} control={form.control} render={({ onChange }) => renderText(onChange)} />
    </Grid>
  );
}

export default Index;
