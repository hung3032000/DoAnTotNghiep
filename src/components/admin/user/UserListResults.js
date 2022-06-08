import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteUser, updateUser } from 'slice/userSlice';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from 'components/fullPageLoading';
import { useDispatch } from 'react-redux';
import UserEditForm from '../form/User/UserEditForm';
import Pagination from 'components/web/pagination';
UserListResults.propTypes = {
  closeDialog: PropTypes.func,
};
let PageSize = 10;
function UserListResults(props) {
  const [loading, setLoading] = useState(false);
  const { dataUserList } = props;
  const dispatch = useDispatch();

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataUserList.map((customer) => customer.id);
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

  const { enqueueSnackbar } = useSnackbar();

  const handleEditUFormSubmit = async (values) => {
    try {
      setLoading(true);
      const action = updateUser(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Sửa Thành công', { variant: 'success' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleDelUFormSubmit = async (id) => {
    try {
      setLoading(true);
      const action = deleteUser(id);
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
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataUserList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataUserList]);
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
                      checked={selectedCustomerIds.length === dataUserList.length}
                      color="primary"
                      indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < dataUserList.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Số điện thoại</TableCell>
                  <TableCell>Ngày sinh</TableCell>
                  <TableCell>Trạng Thái</TableCell>
                  <TableCell>Quyền</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableData.map((customer) => (
                  <TableRow hover key={customer._id} selected={selectedCustomerIds.indexOf(customer._id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(customer._id) !== -1} onChange={(event) => handleSelectOne(event, customer._id)} value="true" />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {customer.lastname + ' ' + customer.fistname}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phonenumber}</TableCell>
                    <TableCell>{moment(customer.updatedAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell>
                      {customer.status === true && <p>Đã xác nhận</p>}
                      {customer.status === false && <p>Đã huỷ</p>}
                    </TableCell>
                    <TableCell>{customer.role}</TableCell>
                    <TableCell>
                      <UserEditForm customer={customer} onSubmit={handleEditUFormSubmit} />
                      <IconButton
                        className="mgr-10"
                        color="primary"
                        aria-label="edit"
                        type="submit"
                        onClick={() => {
                          handleDelUFormSubmit(customer._id);
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
        <Pagination className="pagination cursor" currentPage={currentPage} totalCount={dataUserList.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
      </Card>
    </>
  );
}

export default UserListResults;
