import { Box, Container } from '@material-ui/core';
import OrderHistoryResults from 'components/admin/orderHistory/OrderHistoryResults';
import OrderHistoryToolbar from 'components/admin/orderHistory/OrderHistoryToolbar';
import React from 'react';
import { Helmet } from 'react-helmet';

function OrderHistory() {
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
          <OrderHistoryToolbar />
          <Box sx={{ pt: 3 }}>
            <OrderHistoryResults />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default OrderHistory;
