import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
// import moment from 'moment';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import VoucherEditForm from 'components/admin/form/voucher/VoucherEditForm';
import Loader from 'components/fullPageLoading';
import { getAllVoucher } from 'slice/voucherSlice';

function VoucherListResults() {
  const dataVoucherList = useSelector((state) => state.voucher.voucher);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getAllVoucher();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, dataVoucherList.length]);

  const handleOnEdit = async (values) => {
    try {
      setLoading(true);

      // adminAPI.updateUser(values._id,values);
      // enqueueSnackbar('Sửa Thành công', { variant: 'success' });
      console.log(values._id, values);
      // const action = updateCategoryAdmin(values._id, values);
      // const resultAction = await dispatch(action);
      // unwrapResult(resultAction);
      // window.location.reload();
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
      console.log(id);
      // const action = deleteCategoryAdmin(id);
      // const resultAction = await dispatch(action);
      // unwrapResult(resultAction);
      // window.location.reload();
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
      newSelectedCustomerIds = dataVoucherList.map((category) => category.id);
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
                      checked={selectedCustomerIds.length === dataVoucherList.length}
                      color="primary"
                      indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < dataVoucherList.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Mã giảm giá</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Giảm giá(%)</TableCell>
                  <TableCell>Giảm tối đa</TableCell>
                  <TableCell>Ngày áp dụng</TableCell>
                  <TableCell>HSD</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataVoucherList.slice(0, limit).map((voucher) => (
                  <TableRow hover key={voucher._id} selected={selectedCustomerIds.indexOf(voucher.id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(voucher.id) !== -1} onChange={(event) => handleSelectOne(event, voucher.id)} value="true" />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex',
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {voucher.nameVouncher}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{voucher.description}</TableCell>
                    <TableCell>{voucher.discountPercent}%</TableCell>
                    <TableCell>{voucher.priceOrderLimit}</TableCell>
                    <TableCell>
                      {voucher.dateStart.day}/{voucher.dateStart.month}/{voucher.dateStart.year}
                    </TableCell>
                    <TableCell>
                      {voucher.dateEnd.day}/{voucher.dateEnd.month}/{voucher.dateEnd.year}
                    </TableCell>
                    <TableCell>Đang test</TableCell>
                    <TableCell>
                      <VoucherEditForm vouchers={voucher} onSubmit={handleOnEdit} />
                      <IconButton
                        className="mgr-10"
                        color="primary"
                        aria-label="edit"
                        type="submit"
                        onClick={() => {
                          handleOnDelete(voucher._id);
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
          count={dataVoucherList.length}
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

export default VoucherListResults;
