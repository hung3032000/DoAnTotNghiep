import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteCategoryCAdmin, getListCategoryChildAdmin, updateCategoryCAdmin } from 'components/web/category/CategoryChildSlice';
import { getListCategoryAdmin } from 'components/web/category/CategorySlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import CategoryCEditForm from '../form/categoryChild/CategoryCEditForm';
import adminAPI from 'api/adminAPI';

function CategoryChildListResults() {
  const dataCategoryCList = useSelector((state) => state.categoryChildList.dataA);
  const dataCategoryList = useSelector((state) => state.categoryList.dataA);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const action = getListCategoryChildAdmin({
        page: 1,
        limit: 5,
      });
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      const actionCateP = getListCategoryAdmin({
        page: 1,
        limit: 100,
      });
      const resultActionActionCateP = await dispatch(actionCateP);
      unwrapResult(resultActionActionCateP);
    })();
  }, [dispatch]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleOnEdit = async (values, data) => {
    try {
      if (data) {
        adminAPI.updateImageCategoriesC(values._id, data);
        const action = updateCategoryCAdmin(values);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
        // window.location.reload();
      } else {
        const action = updateCategoryCAdmin(values);
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
        // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
        // window.location.reload();
        // }
      }
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleOnDelete = async (id) => {
    try {
      const action = deleteCategoryCAdmin(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
      // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataCategoryCList.map((categoryC) => categoryC.id);
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
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === dataCategoryCList.length}
                    color="primary"
                    indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < dataCategoryCList.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Tên danh mục</TableCell>
                <TableCell>Tên danh mục chính</TableCell>
                <TableCell>Hình ảnh</TableCell>
                {/* <TableCell>Số sản phẩm</TableCell> */}
                <TableCell>Ngày tạo</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataCategoryCList.slice(0, limit).map((categoryC) => (
                <TableRow hover key={categoryC.id} selected={selectedCustomerIds.indexOf(categoryC.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selectedCustomerIds.indexOf(categoryC.id) !== -1} onChange={(event) => handleSelectOne(event, categoryC.id)} value="true" />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {categoryC.namesubCategory}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{categoryC.categoryID.nameCategory}</TableCell>
                  <TableCell>
                    <img src={categoryC.icon} alt="" width="100%" height="118" />
                  </TableCell>

                  <TableCell>{moment(categoryC.date).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    {categoryC.substatus === true && <p>Đang sử dụng</p>}
                    {categoryC.substatus === false && <p>Không sử dụng</p>}
                  </TableCell>
                  <TableCell>
                    <CategoryCEditForm category={dataCategoryList} categoryC={categoryC} onSubmit={handleOnEdit} />
                    <IconButton
                      className="mgr-10"
                      color="primary"
                      aria-label="edit"
                      type="submit"
                      onClick={() => {
                        handleOnDelete(categoryC._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={dataCategoryCList.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

export default CategoryChildListResults;
