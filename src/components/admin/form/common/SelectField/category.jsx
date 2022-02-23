import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
Category.propTypes = {
  edit: PropTypes.any,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  widthCustome: PropTypes.number, 
  label: PropTypes.string.isRequired,
  categoryOptions: PropTypes.any.isRequired
};

function Category(props) {
  const { form, name, categoryOptions,label,edit,widthCustome } = props;
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
              <option key={index} value={tc._id}>
                {tc.categoryID.nameCategory} - {tc.namesubCategory}
              </option>
            ))}
          </TextField>
        )}
      />
    </Grid>
  );
}

export default Category;
