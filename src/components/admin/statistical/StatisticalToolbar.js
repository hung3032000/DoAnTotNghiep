import { Box, Button, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useSnackbar } from 'notistack';
import Moment from 'moment';
import React, { useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { getProductList } from 'slice/StaticSlice';
import { unwrapResult } from '@reduxjs/toolkit';
function UserListToolbar(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { data, setStatistical } = props;
  const [value, setValue] = useState([null, null]);
  console.log(Moment(value[0]).format('YYYY-MM-DD'));
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions = data.filter(function (el) {
      return el.email.toLowerCase().indexOf(query) > -1;
    });
    setStatistical(filterSuggestions);
  };
  const handleFilter = async () => {
    const action = getProductList({startDate:Moment(value[0]).format('YYYY-MM-DD'),endDate:Moment(value[1]).format('YYYY-MM-DD')});
    const resultAction = await dispatch(action);
    unwrapResult(resultAction);
    enqueueSnackbar('Thêm Thành công', { variant: 'success' });
  }
  return (
    <Box>
      <Box
         sx={{ mt: 3 }}
      >
        <Card>
          <CardContent sx={{ height: "87px" }}>
            <LocalizationProvider  sx={{ mt: 3 }} dateAdapter={AdapterDateFns} localeText={{ start: 'Ngày bắt đầu', end: 'Ngày kết thúc' }}>
              <DateRangePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> đến </Box>
                    <TextField {...endProps} />
                  </>
                )}
              />
            </LocalizationProvider>
            <Button  sx={{left:"80%", mt: 3,top: "-70px" }}
              color="primary"
              variant="contained"
              onClick={handleFilter}
            >
              Thêm người dùng
            </Button>{' '}
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <TextField
                fullWidth={true}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Tìm kiếm"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default UserListToolbar;
