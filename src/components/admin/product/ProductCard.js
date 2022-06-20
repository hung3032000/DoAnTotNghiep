import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteProductDetail, updateImageProduct, updateMultipleImageProduct, updateProductDetail } from 'slice/ProductSlice';
import { useSnackbar } from 'notistack';
import { useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { formatPrice } from 'utils';
import ProductEditForm from '../form/products/ProductsEditForm';
import ProductDetailForm from '../form/products/ProductsDetailForm';
import Loader from 'components/fullPageLoading';
import Pagination from 'components/web/pagination';
import ProductImageForm from '../form/products/ProductImageForm';
import { THUMNAIL_URL_PRODUCTLIST } from 'constants/index';

let PageSize = 5;
function ProductCard(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { dataProductsList, dataCategoryCList } = props;
  const { enqueueSnackbar } = useSnackbar();
  const handleOnEdit = async (values, data) => {
    try {
      setLoading(true);
      const action = updateProductDetail(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      if (data) {
        values.data = data;
        const action2 = updateImageProduct(values);
        const resultAction2 = await dispatch(action2);
        unwrapResult(resultAction2);
      }
      enqueueSnackbar('Sửa Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOnDelete = async (id) => {
    try {
      setLoading(true);
      const action = deleteProductDetail(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Xoá Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleOnEditImage = async (values, data) => {
    try {
      setLoading(true);
      values.data = data;
      console.log(values);
      const action2 = updateMultipleImageProduct(values);
      const resultAction2 = await dispatch(action2);
      unwrapResult(resultAction2);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataProductsList.map((product) => product._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, _id) => {
    const selectedIndex = selectedCustomerIds.indexOf(_id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, _id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, selectedIndex), selectedCustomerIds.slice(selectedIndex + 1));
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataProductsList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataProductsList]);

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
                  <TableCell sx={{ textAlign: 'center' }}>Hình ảnh</TableCell>
                  <TableCell>Thuộc danh mục</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableData.map((product) => (
                  <TableRow hover key={product._id} selected={selectedCustomerIds.indexOf(product._id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(product._id) !== -1} onChange={(event) => handleSelectOne(event, product._id)} value="true" />
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
                      <img src={product.imageMain ? product.imageMain : THUMNAIL_URL_PRODUCTLIST} alt={product.name} width="100%" height="300" />
                    </TableCell>
                    <TableCell>{product.subcategoryId.namesubCategory}</TableCell>
                    <TableCell>
                      {product.status === true && <>Còn hàng</>}
                      {product.status === false && <>Hết hàng</>}
                    </TableCell>

                    <TableCell>
                      <ProductEditForm product={product} onSubmit={handleOnEdit} categoriesC={dataCategoryCList} />
                      <ProductImageForm productId={product._id} onSubmit={handleOnEditImage} />
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
                      <ProductDetailForm product={product} categoriesC={dataCategoryCList} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Pagination
          className="pagination cursor"
          currentPage={currentPage}
          totalCount={dataProductsList.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Card>
    </>
  );
}

export default ProductCard;
