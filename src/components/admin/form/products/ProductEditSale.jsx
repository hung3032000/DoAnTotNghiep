import { Box, Button, Card, CardContent, Container, Divider, Grid } from '@material-ui/core';

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import TextFieldCus from 'components/admin/form/common/TextField/index';
import TextFieldCusDis from 'components/admin/form/common/TextFieldDisable/index';
import { Link } from 'react-router-dom';

import Loader from 'components/fullPageLoading';

ProductEditSale.propTypes = {
  productId: PropTypes.any,
  saleData: PropTypes.any,
  onSubmit: PropTypes.func,
};

function ProductEditSale(props) {
  const { productId, saleData } = props;

  const saleForm = useForm({
    defaultValues: {
      nameSale: saleData.sale.nameSale ? saleData.sale.nameSale : '',
      percentSale: saleData.sale.percentSale ? saleData.sale.percentSale : '',
      description: saleData.sale.description ? saleData.sale.description : '',
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const { onSubmit } = props;
      if (onSubmit) {
        await onSubmit(values);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  return (
    <>
      <Loader showLoader={loading} />
      {saleData.sale ? (
        <>
          <form onSubmit={saleForm.handleSubmit(handleSubmit)}>
            <Container>
              <Card>
                <Divider />
                <CardContent>
                  <Grid container spacing={4}>
                    <TextFieldCusDis widthCustome={12} label="Tên sản phẩm" name="percentSale" edit={saleData.sale.productId.name} />
                    <TextFieldCus widthCustome={6} label="Mã giảm giá" name="nameSale" edit={saleData.sale.nameSale} form={saleForm} />
                    <TextFieldCus widthCustome={6} label="Mô tả" name="description" edit={saleData.sale.description} form={saleForm} />
                    <TextFieldCus widthCustome={6} number={true} max={99} label="Giảm giá(%)" name="percentSale" edit={saleData.sale.percentSale} form={saleForm} />
                    <TextFieldCusDis widthCustome={6} label="Trạng thái" name="percentSale" edit={saleData.status === true ? 'Đang Sale' : 'Không có chương trình sale'} />
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
              <Button type="submit" color="primary">
                Sửa
              </Button>
            </Box>
          </form>
        </>
      ) : (
        <p>
          Hiện chưa có chương trình giảm giá{' '}
          <Link to={`/saleA/newSale/${productId}`} style={{ float: 'right', padding: 0 }}>
            Thêm mới
          </Link>
        </p>
      )}
    </>
  );
}

export default ProductEditSale;
