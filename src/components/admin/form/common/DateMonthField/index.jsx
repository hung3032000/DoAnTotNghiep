import { Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';
Index.propTypes = {
  form: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
};

function Index(props) {
  const { form, date, month } = props;
  const dayOptions = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '27', value: '27' },
    { label: '28', value: '28' },
    { label: '29', value: '29' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
  ];
  const monthOptions = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];
  return (
    <>
    
      <Grid item md={6} xs={12}>
        <Controller
          name={date}
          control={form.control}
          render={({ onChange, onBlur, value }) => (
            
            <TextField fullWidth label="Ngày sinh" select SelectProps={{ native: true }} variant="outlined" value={value} onChange={onChange} onBlur={onBlur}>
              <option style={{ display: 'none' }}></option>
              {dayOptions.map((tc, index) => (
                <option key={index} value={tc.value}>
                  {tc.label}
                </option>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Controller
          name={month}
          control={form.control}
          render={({ onChange, onBlur, value }) => (
            <TextField fullWidth label="Tháng sinh" select SelectProps={{ native: true }} variant="outlined" value={value} onChange={onChange} onBlur={onBlur}>
              <option style={{ display: 'none' }}></option>
              {monthOptions.map((tc, index) => (
                <option key={index} value={tc.value}>
                  {tc.label}
                </option>
              ))}
            </TextField>
          )}
        />
      </Grid>
    </>
  );
}

export default Index;
