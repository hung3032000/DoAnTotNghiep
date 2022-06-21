import { Box, Card, Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { unwrapResult } from '@reduxjs/toolkit';
import { useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import VoucherEditForm from 'components/admin/form/voucher/VoucherEditForm';
import Loader from 'components/fullPageLoading';
import { updateVoucher, deleteVoucher } from 'slice/voucherSlice';
import Pagination from 'components/web/pagination';
import { useSnackbar } from 'notistack';

let PageSize = 10;
function VoucherListResults(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const { dataVoucherList } = props;

  const handleOnEdit = async (values) => {
    try {
      setLoading(true);
      const action = updateVoucher(values);
      const resultAction = await dispatch(action);
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
      const action = deleteVoucher(id);
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

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataVoucherList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataVoucherList]);

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
              
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTableData.map((voucher) => (
                  <TableRow hover key={voucher._id} selected={selectedCustomerIds.indexOf(voucher._id) !== -1}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedCustomerIds.indexOf(voucher._id) !== -1} onChange={(event) => handleSelectOne(event, voucher._id)} value="true" />
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
        <Pagination className="pagination cursor" currentPage={currentPage} totalCount={dataVoucherList.length} pageSize={PageSize} onPageChange={(page) => setCurrentPage(page)} />
      </Card>
    </>
  );
}

export default VoucherListResults;
