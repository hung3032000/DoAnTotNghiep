import { Box, Card, CardContent, InputAdornment, SvgIcon, TextField } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { getListCategoryChildAdmin } from 'slice/CategoryChildSlice';
import { addProductProductDetail, updateImageProduct } from 'slice/ProductSlice';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Search as SearchIcon } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import ProductsNewForm from '../form/products/ProductsNewForm';
import Loader from 'components/fullPageLoading';

function ProductListToolbar(props) {
  const { data, setProductsList } = props;

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
  const [loading, setLoading] = useState(false);

  const handleNewUFormSubmit = async (values, data) => {
    try {
      setLoading(true);
      const action = addProductProductDetail(values);
      const resultAction = await dispatch(action);
      const products = unwrapResult(resultAction);
      if (data) {
        values._id = products._id;
        values.data = data;
        const action2 = updateImageProduct(values);
        const resultAction2 = await dispatch(action2);
        unwrapResult(resultAction2);
      }
      enqueueSnackbar('Thêm Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    var filterSuggestions = data.filter(function (el) {
      return el.name.toLowerCase().indexOf(query) > -1;
    });
    setProductsList(filterSuggestions);
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
          <ProductsNewForm onSubmit={handleNewUFormSubmit} categoriesC={dataCategoryCList} />
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
export default ProductListToolbar;
