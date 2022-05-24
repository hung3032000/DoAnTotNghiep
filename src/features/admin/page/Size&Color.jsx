import VoucherListResults from 'components/admin/voucher/VoucherListResults';
import VoucherListToolbar from 'components/admin/voucher/VoucherListToolbar';
import React from 'react';
import Common from './Common';

const SizeAColor = () => {
  return <Common title="Quản lý voucher" toolbar={<VoucherListToolbar />} listResults={<VoucherListResults />} />;
};

export default SizeAColor;
