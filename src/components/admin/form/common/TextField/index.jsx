import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import React,{ useState } from 'react';
Index.propTypes = {
    form: PropTypes.object.isRequired,
    edit: PropTypes.any, 
    widthCustome: PropTypes.number, 
    name: PropTypes.string.isRequired, 
    label: PropTypes.string.isRequired
};

function Index(props) {
  const { form,name,label,edit,widthCustome  } = props;
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
          <TextField
            fullWidth
            label={label}
            onChange={handleOnChange} onBlur={onChange}
            required
            value={value}
            variant="outlined"
          />
        )}
      />
    </Grid>
  );
}

export default Index;
