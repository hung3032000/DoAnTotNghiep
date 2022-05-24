import OrderListCompleteResults from 'components/admin/orderComplete/OrderListCompleteResults';
import OrderListCompleteToolbar from 'components/admin/orderComplete/OrderListCompleteToolbar';
import React from 'react';
import Common from './Common';
function OrderListComplete() {
  return <Common title="Quản lý đơn hàng" toolbar={<OrderListCompleteToolbar />} listResults={<OrderListCompleteResults />} />;
}

export default OrderListComplete;
