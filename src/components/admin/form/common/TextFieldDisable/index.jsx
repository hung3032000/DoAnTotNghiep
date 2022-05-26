import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

Index.propTypes = {
  InputProps: PropTypes.any,
  edit: PropTypes.any,
  widthCustome: PropTypes.number,
  label: PropTypes.string.isRequired,
};

function Index(props) {
  const { label, widthCustome, edit,InputProps } = props;
  const width = widthCustome === undefined ? 6 : widthCustome;
  return (
    <Grid item md={width} xs={12}>
      <TextField fullWidth label={label} disabled value={edit} variant="outlined" InputProps={InputProps}/>
    </Grid>
  );
}

export default Index;
