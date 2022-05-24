import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import { getListCategoryChildAdmin } from 'slice/CategoryChildSlice';
import { addProductProductDetail } from 'slice/ProductSlice';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import ProductsNewForm from '../form/products/ProductsNewForm';

function ProductListToolbar() {

  const dataCategoryCList = useSelector((state) => state.categoryChildList.dataA);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const action = getListCategoryChildAdmin();
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
    })();
  }, [dispatch]);

  const { enqueueSnackbar } = useSnackbar();

  // categories.map((product) =>console.log(product.nameCategory))

  const handleNewUFormSubmit = async (values,data) => {
    
    try {
      const action = addProductProductDetail(values);
      const resultAction = await dispatch(action);
      const products = unwrapResult(resultAction);
      adminAPI.updateImageProduct(products._id,data);
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
        <ProductsNewForm onSubmit={handleNewUFormSubmit} categoriesC={dataCategoryCList}/>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  ),
                }}
                placeholder="Search product"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
export default ProductListToolbar;
