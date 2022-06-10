import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
Status.propTypes = {
  edit: PropTypes.any,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  widthCustome: PropTypes.number,
  label: PropTypes.string.isRequired,
  categoryOptions: PropTypes.any.isRequired,
};

function Status(props) {
  const { form, name, categoryOptions, label,edit,widthCustome } = props;
  const [value, setValue] = useState(edit);
  const handleOnChange = (event) => {
    setValue(event.target.value);
  };
  const width = (widthCustome === undefined) ? 6 :  widthCustome;
  return (
    <Grid item md={width} xs={12}>
      <Controller
        name={name}
        defaultValue
        control={form.control}
        render={({ onChange }) => (
          <TextField fullWidth={true} label={label} required select SelectProps={{ native: true }} variant="outlined"  value={value} onChange={handleOnChange} onBlur={onChange}>
            <option style={{ display: 'none' }}></option>
            {categoryOptions.map((tc, index) => (
              <option key={index} value={tc.nameCategory}>
                {tc.nameCategory}-{tc.status === true && '(Hoạt động)'}
                {tc.status === false && '(Tạm dừng)'}
              </option>
            ))}
          </TextField>
        )}
      />
    </Grid>
  );
}

export default Status;
