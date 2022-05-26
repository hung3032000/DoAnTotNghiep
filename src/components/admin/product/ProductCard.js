import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import adminAPI from 'api/adminAPI';
import { getListCategoryChildAdmin } from 'slice/CategoryChildSlice';
import { getListProductAdmin } from 'slice/ProductListSlice';
import { deleteProductDetail, updateProductDetail } from 'slice/ProductSlice';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from 'utils';
import ProductEditForm from '../form/products/ProductsEditForm';
import ProductDetailForm from '../form/products/ProductsDetailForm';
import Loader from 'components/fullPageLoading';

function ProductCard() {
  const [loading, setLoading] = useState(false);

  //fetch data category
  const dataCategoryCList = useSelector((state) => state.categoryChildList.dataA);
  const dataProductsList = useSelector((state) => state.productList.dataA);

  const dispatch = useDispatch();

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        //categoryC
        const actionChild = getListCategoryChildAdmin({
          page: 1,
          limit: 10,
        });
        const resultActionChild = await dispatch(actionChild);
        unwrapResult(resultActionChild);
        //product
        const actionGetProducts = getListProductAdmin({
          page: 1,
          limit: 100,
        });
        const resultActionGetProducts = await dispatch(actionGetProducts);
        unwrapResult(resultActionGetProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  const { enqueueSnackbar } = useSnackbar();

  //handl action
  const handleOnEdit = async (values, data) => {
    try {
      setLoading(true);

      if (data) {
        adminAPI.updateImageProduct(values._id, data);
        const action = updateProductDetail(values);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        enqueueSnackbar('Sửa Thành công', { variant: 'success' });
        window.location.reload();
      } else {
        const action = updateProductDetail(values);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        enqueueSnackbar('Sửa Thành công', { variant: 'success' });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  // updateProduct
  const handleOnDelete = async (id) => {
    try {
      setLoading(true);
      const action = deleteProductDetail(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Xoá Thành công', { variant: 'success' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  //paging action
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataProductsList.map((product) => product.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, selectedIndex), selectedCustomerIds.slice(selectedIndex + 1));
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Loader showLoader={loading} />
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === dataProductsList.length}
                      color="primary"
                      indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < dataProductsList.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Tên sản phẩm</TableCell>
                  <TableCell>Giá</TableCell>
                  <TableCell>Hình ảnh</TableCell>
                  <TableCell>Thuộc danh mục</TableCell>
                  <TableCell>Trạng thái</TableCell>

                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataProductsList.slice(0, limit).map((product) => (
                  <TableRow hover key={product.id} selected={selectedCustomerIds.indexOf(product.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(product.id) !== -1} onChange={(event) => handleSelectOne(event, product.id)} value="true" />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <img src={product.images} alt="" width="100%" height="118" />
                    </TableCell>
                    <TableCell>{product.subcategoryId.namesubCategory}</TableCell>
                    <TableCell>
                      {product.status === true && <p>Còn hàng</p>}
                      {product.status === false && <p>Hết hàng</p>}
                    </TableCell>
                    <TableCell>
                      <ProductEditForm product={product} onSubmit={handleOnEdit} categoriesC={dataCategoryCList} />
                      <IconButton
                        className="mgr-10"
                        color="primary"
                        tiltle="edit"
                        type="submit"
                        onClick={() => {
                          console.log('Size');
                        }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton
                        className="mgr-10"
                        color="primary"
                        tiltle="edit"
                        type="submit"
                        onClick={() => {
                          handleOnDelete(product._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <ProductDetailForm  product={product} categoriesC={dataCategoryCList} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={dataProductsList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
}

export default ProductCard;
