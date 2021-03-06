import { Box, Card, CardHeader, Chip, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';

function LatestOrders(props) {
  const { data, label } = props;
  return (
    <Card {...props}>
      <CardHeader title={label} />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell>Ngày</TableCell>
                <TableCell>Trạng thái</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(0, 5).map((order) => (
                <TableRow hover key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.addressrecevie.name}</TableCell>
                  <TableCell>{moment(order.createdAt).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>
                    <Chip color="primary" label={order.status} size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <a href="/ordersA">Xem tất cả đơn hàng</a>
      </Box>
    </Card>
  );
}

export default LatestOrders;
