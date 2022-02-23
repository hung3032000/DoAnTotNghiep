import { Box, Container } from '@material-ui/core';
import OrderListCompleteResults from 'components/admin/orderComplete/OrderListCompleteResults';
import OrderListCompleteToolbar from 'components/admin/orderComplete/OrderListCompleteToolbar';
import React from 'react';
import { Helmet } from 'react-helmet';
function OrderListComplete() {
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
          <OrderListCompleteToolbar />
          <Box sx={{ pt: 3 }}>
            <OrderListCompleteResults />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OrderListComplete;
