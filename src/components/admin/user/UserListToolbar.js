import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import UserNewForm from 'components/admin/form/User/UserNewForm';
import adminAPI from 'api/adminAPI';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addUser } from 'slice/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';

function UserListToolbar(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { data, setUserList } = props;
  const handleNewUFormSubmit = async (values) => {
    try {
      const action = addUser(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
      adminAPI.addUser(values);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions = data.filter(function (el) {
      return el.email.toLowerCase().indexOf(query) > -1;
    });
    setUserList(filterSuggestions);
  };
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <UserNewForm onSubmit={handleNewUFormSubmit} />
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
