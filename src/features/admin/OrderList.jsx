import { Box, Container } from '@material-ui/core';
import OrderListResults from 'components/admin/order/OrderListResults';
import OrderListToolbar from 'components/admin/order/OrderListToolbar';
import React from 'react';
import { Helmet } from 'react-helmet';

function OrderList() {
  return (
    <>
      <Helmet>
        <title>Quản lý đơn hàng</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <OrderListToolbar />
          <Box sx={{ pt: 3 }}>
            <OrderListResults />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OrderList;
