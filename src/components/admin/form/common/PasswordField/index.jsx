import { FormControl, Grid, InputLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
Index.propTypes = {
  form: PropTypes.object.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

function Index(props) {
  const { form, name, label } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <Grid item md={6} xs={12}>
      <FormControl fullWidth variant="outlined">
        <InputLabel htmlFor={name}>{label}</InputLabel>

        <Controller
          name={name}
          control={form.control}
          render={({ onChange, onBlur, value, name }) => (
            <OutlinedInput
              id={name}
              required
              type={showPassword ? 'text' : 'password'}
              label={label}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={toggleShowPassword} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              // disabled={disabled}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />

        {/* <FormHelperText>{errors[name]?.message}</FormHelperText> */}
      </FormControl>
    </Grid>
  );
}

export default Index;
