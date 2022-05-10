import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from 'components/admin/customer/CustomerListResults';
import CustomerListToolbar from 'components/admin/customer/CustomerListToolbar';
import React, { useEffect, useState } from 'react';
import adminAPI from 'api/adminAPI';

function CustomerList() {

  const [CustomerList, setCustomerList] = useState([]);
  useEffect(() => {
  (async () => {
    try {
      const data  = await adminAPI.getAllUser();
      setCustomerList(data);
    } catch (error) {
      console.log(error);
    }
  })();
  },[]);
  return (
    <>
    <Helmet>
      <title>Quản lý khách hàng</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <CustomerListResults customers={CustomerList} />
        </Box>
      </Container>
    </Box>
  </>
  );
}

export default CustomerList;
