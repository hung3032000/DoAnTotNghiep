import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

Status.propTypes = {
  edit: PropTypes.any,
  widthCustome: PropTypes.number,
  label: PropTypes.string.isRequired,
};

function Status(props) {
  const { label, edit, widthCustome } = props;

  const width = widthCustome === undefined ? 6 : widthCustome;
  return (
    <Grid item md={width} xs={12}>
      <TextField fullWidth label={label} disabled value={edit ? "Còn hàng" : "Hết hàng"} variant="outlined" />
    </Grid>
  );
}

export default Status;
