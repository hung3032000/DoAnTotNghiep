import OrderHistoryResults from 'components/admin/orderHistory/OrderHistoryResults';
import OrderHistoryToolbar from 'components/admin/orderHistory/OrderHistoryToolbar';
import React from 'react';
import Common from './Common';

function OrderHistory() {
  return <Common title="Quản lý đơn hàng" toolbar={<OrderHistoryToolbar />} listResults={<OrderHistoryResults />} />;
}

export default OrderHistory;
