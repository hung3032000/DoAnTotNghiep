import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import CategoryCNewForm from 'components/admin/form/categoryChild/CategoryCNewForm';
import { createNewCategoryCAdmin, updateImageAdmin } from 'slice/CategoryChildSlice';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import Loader from 'components/fullPageLoading';

function CategoryChildListToolbar(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      values.categoryID = parseInt(values.categoryID);
      if (data) {
        values.data = data;
        const actionImage = updateImageAdmin(values);
        const resultActionImage = await dispatch(actionImage);
        unwrapResult(resultActionImage);
      }
      const action = createNewCategoryCAdmin(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader showLoader={loading} />
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
    </>
  );
}
export default CategoryChildListToolbar;
