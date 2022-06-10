import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import CategoryNewForm from 'components/admin/form/category/CategoryNewForm';
import { createNewCategoryAdmin } from 'slice/CategorySlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

function CategoryListToolbar(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { data, setCategoryList } = props;
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions = data.filter(function (el) {
      return el.nameCategory.toLowerCase().indexOf(query) > -1;
    });
    setCategoryList(filterSuggestions);
  };
  const handleNewCategoryFormSubmit = async (values) => {
    try {
      const action = createNewCategoryAdmin(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <CategoryNewForm onSubmit={handleNewCategoryFormSubmit} />
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
export default CategoryListToolbar;
