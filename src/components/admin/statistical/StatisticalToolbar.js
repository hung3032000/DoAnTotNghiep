import { Box, Button, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch } from 'react-redux';
import { getOrderList, getProductList } from 'slice/StaticSlice';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  p: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    alignSelf: 'center',
    marginBottom: 0,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    width: '30%',
  },
  buttonSubmit: {
    marginRight: theme.spacing(1),
  },
}));
function StatisticalToolbar(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { setStatistical, data, setStatus, setSearch } = props;
  const [fromDate, setFromDate] = useState('');
  const [required, setRequired] = useState(false);
  const [toDate, setToDate] = useState('');

  const [values, setValues] = useState('product');

  const handleChangeState = (event) => {
    const values = event.target.value;
    setSearch([]);
    setStatus(values);
    setValues(values);
    setStatistical(data);
  };
  const states = [
    {
      value: 'product',
      label: 'Sản phẩm',
    },
    {
      value: 'order',
      label: 'Đơn hàng',
    },
  ];

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions;
    if (values === 'product') {
      filterSuggestions = data.filter(function (el) {
        return el.product.name.toLowerCase().indexOf(query) > -1;
      });
      setSearch(filterSuggestions);
    }
    if (values === 'order') {
      filterSuggestions = data.filter(function (el) {
        return el.orderId.userId.email.toLowerCase().indexOf(query) > -1;
      });
      setSearch(filterSuggestions);
    }
    if (query.length === 0) {
      setSearch([]);
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      if (fromDate !== '') {
        if (values === 'order') {
          const actionFilter = getOrderList({ startDate: fromDate, endDate: toDate });
          const resultActionFilter = await dispatch(actionFilter);
          unwrapResult(resultActionFilter);
        } else {
          const action = getProductList({ startDate: fromDate, endDate: toDate });
          const resultAction = await dispatch(action);
          unwrapResult(resultAction);
        }
        enqueueSnackbar('Lọc Thành công', { variant: 'success' });
      }
    } catch (error) {
      console.log(error);
    } 
  };
  const handleSetFromDate = (event) => {
    setFromDate(event.target.value);
  };
  const handleSetToDate = (event) => {
    setToDate(event.target.value);
  };
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const actionFilter = getOrderList();
      const resultActionFilter = await dispatch(actionFilter);
      unwrapResult(resultActionFilter);

      const action = getProductList();
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
    } catch (error) {
      console.log(error);
    } finally {
    }
    setToDate('');
    setFromDate('');
    setValues('product');
  };

  useEffect(() => {
    if (toDate || fromDate) {
      setRequired(true);
    }
    if (toDate === '' && fromDate === '') {
      setRequired(false);
    }
  }, [toDate, fromDate]);
  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);
        const action = getProductList();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <Box>
      <form onSubmit={handleFilter}>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent className={classes.container}>
              <TextField
                className={classes.selectEmpty}
                label="Lọc theo"
                onChange={handleChangeState}
                required
                select
                SelectProps={{ native: true }}
                value={values}
                variant="outlined"
              >
                <option value="" hidden></option>
                {states.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                id="fromDate"
                label="Ngày bắt đầu"
                required={!!required}
                onChange={handleSetFromDate}
                className={classes.textField}
                type="date"
                value={fromDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <p className={classes.p}> Đến </p>
              <TextField
                id="toDate"
                label="Ngày kết thúc"
                onChange={handleSetToDate}
                required={!!required}
                type="date"
                value={toDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <Button className={classes.buttonSubmit} type="submit" color="primary" variant="contained">
                Lọc
              </Button>
              <Button className={classes.buttonSubmit} color="primary" variant="contained" onClick={handleReset}>
                Reset
              </Button>
            </CardContent>
          </Card>
        </Box>
      </form>
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

export default StatisticalToolbar;
