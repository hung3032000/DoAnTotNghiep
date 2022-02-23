import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import CategoryCNewForm from 'components/admin/form/categoryChild/CategoryCNewForm';
import { createNewCategoryCAdmin } from 'components/web/category/CategoryChildSlice';
import { getListCategoryAdmin } from 'components/web/category/CategorySlice';
import { useEffect } from 'react';
import adminAPI from 'api/adminAPI';
import { useSnackbar } from 'notistack';

function CategoryChildListToolbar() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const dataCategoryList = useSelector((state) => state.categoryList.dataA);

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        const action = getListCategoryAdmin({
          page: 1,
          limit: 100
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch, dataCategoryList.length]);

  const handleNewCategoryCFormSubmit = async (values,data) => {
    try {
      const action = createNewCategoryCAdmin(values);
      const resultAction = await dispatch(action);
      const categoryC = unwrapResult(resultAction);
      adminAPI.updateImageCategoriesC(categoryC._id,data);
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
        <CategoryCNewForm category={dataCategoryList} onSubmit={handleNewCategoryCFormSubmit} />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullwidth="true"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search customer"
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
