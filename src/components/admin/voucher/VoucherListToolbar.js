import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import VoucherNewForm from 'components/admin/form/voucher/VoucherNewForm';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import {addVoucher } from 'slice/voucherSlice';

function VoucherListToolbar(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { data, setVoucherList } = props;
  const handleNewCategoryFormSubmit = async (values) => {
    try {
      const action = addVoucher(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions = data.filter(function (el) {
      return el.nameVouncher.toLowerCase().indexOf(query) > -1;
    });
    setVoucherList(filterSuggestions);
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <VoucherNewForm onSubmit={handleNewCategoryFormSubmit} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box>
              <TextField
                onChange={handleChange}
                fullWidth={true}
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
export default VoucherListToolbar;
