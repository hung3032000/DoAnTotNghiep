import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import CategoryCNewForm from 'components/admin/form/categoryChild/CategoryCNewForm';
import { createNewCategoryCAdmin } from 'slice/CategoryChildSlice';
import adminAPI from 'api/adminAPI';
import { useSnackbar } from 'notistack';

function CategoryChildListToolbar(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { data, setSubCategoryList } = props;
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions = data.filter(function (el) {
      return el.namesubCategory.toLowerCase().indexOf(query) > -1;
    });
    setSubCategoryList(filterSuggestions);
  };
  const dataCategoryList = useSelector((state) => state.categoryList.dataA);

  const handleNewCategoryCFormSubmit = async (values, data) => {
    try {
      const action = createNewCategoryCAdmin(values);
      const resultAction = await dispatch(action);
      const categoryC = unwrapResult(resultAction);
      adminAPI.updateImageCategoriesC(categoryC._id, data);
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      window.location.reload();
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
        <CategoryCNewForm category={dataCategoryList} onSubmit={handleNewCategoryCFormSubmit} />
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
export default CategoryChildListToolbar;
