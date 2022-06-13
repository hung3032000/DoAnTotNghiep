import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteCategoryCAdmin, updateCategoryCAdmin } from 'slice/CategoryChildSlice';
import moment from 'moment';
import { useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import CategoryCEditForm from '../form/categoryChild/CategoryCEditForm';
import adminAPI from 'api/adminAPI';
import Loader from 'components/fullPageLoading';
import Pagination from 'components/web/pagination';
let PageSize = 5;
function CategoryChildListResults(props) {
  const [loading, setLoading] = useState(false);
  const { dataCategoryCList, dataCategoryList } = props;
  const dispatch = useDispatch();

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

  const handleOnEdit = async (values, data) => {
    try {
      setLoading(true);
      console.log(values);
      // if (data) {
      //   adminAPI.updateImageCategoriesC(values._id, data);
      //   const action = updateCategoryCAdmin(values);
      //   const resultAction = await dispatch(action);
      //   unwrapResult(resultAction);
      //   // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
      //   // window.location.reload();
      // } else {
      //   const action = updateCategoryCAdmin(values);
      //   const resultAction = await dispatch(action);
      //   unwrapResult(resultAction);
      //   enqueueSnackbar('Sửa Thành công', { variant: 'success' });
      //   window.location.reload();
        
      // }
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

      const action = deleteCategoryCAdmin(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
      // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
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

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataCategoryCList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataCategoryCList]);

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
                {currentTableData.map((categoryC) => (
                  <TableRow hover key={categoryC._id} selected={selectedCustomerIds.indexOf(categoryC._id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(categoryC._id) !== -1} onChange={(event) => handleSelectOne(event, categoryC._id)} value="true" />
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
        <Pagination
          className="pagination cursor"
          currentPage={currentPage}
          totalCount={dataCategoryCList.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Card>
    </>
  );
}

export default CategoryChildListResults;
