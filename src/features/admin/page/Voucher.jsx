import VoucherListResults from 'components/admin/voucher/VoucherListResults';
import VoucherListToolbar from 'components/admin/voucher/VoucherListToolbar';
import React, { useState } from 'react';
import Common from './Common';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';
import { getAllVoucher } from 'slice/voucherSlice';
function Voucher() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataVoucherList = useSelector((state) => state.voucher.voucher);
  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const action = getAllVoucher();
        const resultAction = await dispatch(action);
        unwrapResult(resultAction);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);
  const [voucherList, setVoucherList] = useState(dataVoucherList);
  return (
    <>
      <Loader showLoader={loading} />

      <Common title="Quản lý voucher" toolbar={<VoucherListToolbar data={dataVoucherList} setVoucherList={setVoucherList} />}
       listResults={<VoucherListResults dataVoucherList={voucherList.length === 0 ? dataVoucherList : voucherList}/>} />
    </>
  );
}

export default Voucher;
