import { Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import Pagination from 'components/web/pagination';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { formatPrice } from 'utils';
import OrderListInfo from '../order/OrderListInfo';
StatisticalResults.propTypes = {
  closeDialog: PropTypes.func,
};
let PageSize = 5;
function StatisticalResults(props) {
  const { dataStatistical, status, search } = props;
  console.log(search);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = dataStatistical.map((customer) => customer._id);
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
  const render = (customer) => {
    if (status === 'product') {
      return (
        <>
          <TableRow hover key={customer.productId} selected={selectedCustomerIds.indexOf(customer.productId) !== -1}>
            <TableCell padding="checkbox">
              <Checkbox checked={selectedCustomerIds.indexOf(customer.productId) !== -1} onChange={(event) => handleSelectOne(event, customer.productId)} value="true" />
            </TableCell>
            <TableCell>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                }}
              >
                <Typography color="textPrimary" variant="body1">
                  {customer.product?.name}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>{formatPrice(customer.product?.price)}</TableCell>
            <TableCell>{formatPrice(customer.totalPriceSale)}</TableCell>
            <TableCell>{customer.totalQuantitySale}</TableCell>
          </TableRow>
        </>
      );
    }
    return (
      <>
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
                {customer._id}
              </Typography>
            </Box>
          </TableCell>
          <TableCell>{formatPrice(customer.totalPrice)}</TableCell>
          <TableCell>{formatPrice(customer.shiprice)}</TableCell>
          <TableCell>{customer.orderId?.userId.email}</TableCell>
          <OrderListInfo order={customer?.orderId} />
        </TableRow>
      </>
    );
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return (search.length === 0 ? dataStatistical : search).slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataStatistical, search]);
  return (
    <>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === dataStatistical.length}
                      color="primary"
                      indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < dataStatistical.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  {status === 'product' ? (
                    <>
                      <TableCell>Tên sản phẩm</TableCell>
                      <TableCell>Giá sản phẩm</TableCell>
                      <TableCell>Doanh thu bán sản phẩm</TableCell>
                      <TableCell>Tổng sản phẩm bán được</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>Id</TableCell>
                      <TableCell>Tổng đơn hàng</TableCell>
                      <TableCell>Phí vận chuyển</TableCell>
                      <TableCell>Email khách</TableCell>

                      <TableCell></TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>{currentTableData.map((customer) => render(customer))}</TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Pagination
          className="pagination cursor"
          currentPage={currentPage}
          totalCount={search.length ? search.length : dataStatistical.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Card>
    </>
  );
}

export default StatisticalResults;
