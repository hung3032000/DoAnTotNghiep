import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
Category.propTypes = {
  edit: PropTypes.any,
  widthCustome: PropTypes.number,
  label: PropTypes.string.isRequired,
  categoryOptions: PropTypes.any.isRequired,
};

function Category(props) {
  const { categoryOptions, label, edit, widthCustome } = props;

  const width = widthCustome === undefined ? 6 : widthCustome;
  return (
    <Grid item md={width} xs={12}>
      <TextField fullWidth label={label} disabled select SelectProps={{ native: true }} variant="outlined" value={edit}>
        <option style={{ display: 'none' }}></option>
        {categoryOptions.map((tc, index) => (
          <option key={index} value={tc._id}>
            {tc.categoryID.nameCategory}({tc.namesubCategory})
          </option>
        ))}
      </TextField>
    </Grid>
  );
}

export default Category;
