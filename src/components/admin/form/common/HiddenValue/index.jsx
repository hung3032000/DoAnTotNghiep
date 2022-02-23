import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

Index.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};

function Index(props) {
  const { form, name } = props;

  return (
    <Grid hidden>
      <Controller
        name={name}
        control={form.control}
        render={({ value }) => <TextField value={value} />}
      />
    </Grid>
  );
}

export default Index;
