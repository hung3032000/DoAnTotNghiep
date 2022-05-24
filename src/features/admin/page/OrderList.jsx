import OrderListResults from 'components/admin/order/OrderListResults';
import OrderListToolbar from 'components/admin/order/OrderListToolbar';
import React from 'react';
import Common from './Common';

function OrderList() {
  return <Common title="Quản lý đơn hàng" toolbar={<OrderListToolbar />} listResults={<OrderListResults />} />;
}

export default OrderList;
