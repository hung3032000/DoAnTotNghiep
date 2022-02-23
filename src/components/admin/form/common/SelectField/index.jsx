import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

Index.propTypes = {
  edit: PropTypes.any,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired, 
  widthCustome: PropTypes.number, 
  categoryOptions: PropTypes.any.isRequired
};

function Index(props) {
  const { form, edit, name, label,categoryOptions,widthCustome } = props;
  const [value, setValue] = useState(edit);
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  const width = (widthCustome === undefined) ? 6 :  widthCustome;
  return (
    <Grid item md={width} xs={12}>
      <Controller
        name={name}
        control={form.control}
        render={({ onChange }) => (
          <TextField fullWidth label={label} required select SelectProps={{ native: true }} variant="outlined" value={value} onChange={handleOnChange} onBlur={onChange}>
            <option style={{ display: 'none' }}></option>
            {categoryOptions.map((tc, index) => (
              <option key={index} value={tc.value}>
                {tc.label}
              </option>
            ))}
          </TextField>
        )}
      />
    </Grid>
  );
}

export default Index;
