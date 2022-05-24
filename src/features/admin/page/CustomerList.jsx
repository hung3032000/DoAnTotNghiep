import CustomerListResults from 'components/admin/customer/CustomerListResults';
import CustomerListToolbar from 'components/admin/customer/CustomerListToolbar';
import React, { useEffect, useState } from 'react';
import adminAPI from 'api/adminAPI';
import Common from './Common';

function CustomerList() {
  const [CustomerList, setCustomerList] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await adminAPI.getAllUser();
        setCustomerList(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return <Common title="Quản lý khách hàng" toolbar={<CustomerListToolbar />} listResults={<CustomerListResults customers={CustomerList} />} />;
}
export default CustomerList;
