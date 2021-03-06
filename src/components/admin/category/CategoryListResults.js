import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteCategoryAdmin, updateCategoryAdmin } from 'slice/CategorySlice';
import moment from 'moment';
import { useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import CategoryEditForm from '../form/category/CategoryEditForm';
import Loader from 'components/fullPageLoading';
import Pagination from 'components/web/pagination';
import { useSnackbar } from 'notistack';
let PageSize = 3;
function CategoryListResults(props) {
  const { dataCategoryList } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOnEdit = async (values) => {
    try {
      setLoading(true);
      const action = updateCategoryAdmin(values);
      const resultAction = dispatch(action);
      unwrapResult(resultAction);
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
      const action = deleteCategoryAdmin(id);
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

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

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

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataCategoryList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataCategoryList]);

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
                  <TableCell>Số danh mục con</TableCell>
                  <TableCell>Ngày tạo</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableData.map((category) => (
                  <TableRow hover key={category._id} selected={selectedCustomerIds.indexOf(category._id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(category._id) !== -1} onChange={(event) => handleSelectOne(event, category._id)} value="true" />
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
                      {category.status === true && <>Đang sử dụng</>}
                      {category.status === false && <>Không sử dụng</>}
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
        <Pagination
          className="pagination cursor"
          currentPage={currentPage}
          totalCount={dataCategoryList.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Card>
    </>
  );
}

export default CategoryListResults;
