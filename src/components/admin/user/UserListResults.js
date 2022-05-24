import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteUser, getAllUser, updateUser } from 'slice/userSlice';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from 'components/fullPageLoading';

import UserEditForm from '../form/User/UserEditForm';
UserListResults.propTypes = {
  closeDialog: PropTypes.func,
};

function UserListResults(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataUserList = useSelector((state) => state.user.userList);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const action = getAllUser();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, dataUserList.lenght]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);
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

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const { enqueueSnackbar } = useSnackbar();

  const handleEditUFormSubmit = async (values) => {
    try {
      const action = updateUser(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Sửa Thành công', { variant: 'success' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  const handleDelUFormSubmit = async (id) => {
    try {
      const action = deleteUser(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar('Xoá Thành công', { variant: 'success' });
      window.location.reload();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
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
                {dataUserList.slice(0, limit).map((customer) => (
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
        <TablePagination
          component="div"
          count={dataUserList.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 50, 100]}
        />
      </Card>
    </>
  );
}

export default UserListResults;
