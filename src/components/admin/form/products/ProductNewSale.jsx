import { Box, Button, Card, CardContent, Container, Divider, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouteMatch } from 'react-router';
import TextFieldCus from 'components/admin/form/common/TextField/index';
import { addSale } from 'slice/SaleSlice';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import Loader from 'components/fullPageLoading';

function ProductNewSale() {
  const {
    params: { id },
  } = useRouteMatch();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    values.productId = id;
    values.statusSale = true;
    try {
      setLoading(true);
      const action = addSale(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location = "/productsA"
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const saleForm = useForm({
    defaultValues: {
      nameSale: '',
      percentSale: '',
      description: '',
    },
  });
  return (
    <>
      <Loader showLoader={loading} />

      <form onSubmit={saleForm.handleSubmit(handleSubmit)}>
        <Container>
          <Card>
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <TextFieldCus widthCustome={12} label="Mã giảm giá" name="nameSale" form={saleForm} />
                <TextFieldCus widthCustome={12} number={true} label="Phần trăm sale(%)" name="percentSale" form={saleForm} />
                <TextFieldCus widthCustome={12} label="Mô tả" name="description" form={saleForm} />
              </Grid>
            </CardContent>
            <Divider />
          </Card>
        </Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button className="mgr-10" color="primary" variant="contained" type="submit">
            Lưu
          </Button>
        </Box>
      </form>
    </>
  );
}

export default ProductNewSale;
