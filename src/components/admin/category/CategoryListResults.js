import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteCategoryAdmin, getListCategoryAdmin, updateCategoryAdmin } from 'slice/CategorySlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import CategoryEditForm from '../form/category/CategoryEditForm';
import Loader from 'components/fullPageLoading';

function CategoryListResults() {
  const dataCategoryList = useSelector((state) => state.categoryList.dataA);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const action = getListCategoryAdmin({
          page: 1,
          limit: 100,
        });
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, dataCategoryList.length]);

  const handleOnEdit = async (values) => {
    try {
      setLoading(true);

      // adminAPI.updateUser(values._id,values);
      // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
      const action = updateCategoryAdmin(values._id, values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleOnDelete = async (id) => {
    try {
      setLoading(true);
      const action = deleteCategoryAdmin(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataCategoryList.map((category) => category.id);
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
                      checked={selectedCustomerIds.length === dataCategoryList.length}
                      color="primary"
                      indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < dataCategoryList.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Tên danh mục</TableCell>
                  {/* <TableCell>Email</TableCell> */}
                  <TableCell>Số danh mục con</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataCategoryList.slice(0, limit).map((category) => (
                  <TableRow hover key={category._id} selected={selectedCustomerIds.indexOf(category.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(category.id) !== -1} onChange={(event) => handleSelectOne(event, category.id)} value="true" />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {category.nameCategory}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{category.subcategories.length}</TableCell>
                    <TableCell>{moment(category.datecreated).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      {category.status === true && <p>Đang sử dụng</p>}
                      {category.status === false && <p>Không sử dụng</p>}
                    </TableCell>
                    <TableCell>
                      <CategoryEditForm category={category} onSubmit={handleOnEdit} />
                      <IconButton
                        className="mgr-10"
                        color="primary"
                        aria-label="edit"
                        type="submit"
                        onClick={() => {
                          handleOnDelete(category._id);
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
          count={dataCategoryList.length}
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

export default CategoryListResults;
