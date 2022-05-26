import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import InfoIcon from '@material-ui/icons/Info';

import React, { useState } from 'react';
import SelectField from 'components/admin/form/common/TextFieldDisable/status';
import TextFieldCusDis from 'components/admin/form/common/TextFieldDisable/index';
import CategorySelectField from 'components/admin/form/common/TextFieldDisable/category';

import ProductSizeAColorDetailForm from 'components/admin/form/products/ProductSizeAColorDetailForm';
import ProductSaleDetailForm from 'components/admin/form/products/ProductSaleDetailForm';

ProductsDetailForm.propTypes = {
  product: PropTypes.object.isRequired,
};

function ProductsDetailForm(props) {

  const { product, categoriesC } = props;

  
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton className="mgr-10" color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
        <DialogTitle id="form-dialog-title">Thông tin chi tiết sản phẩm</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <Container>
              <Grid container spacing={3}>
                <Grid item>
                  <Card>
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <TextFieldCusDis widthCustome={6} label="Content" name="content" edit={product.content} />
                        <TextFieldCusDis label="Mô tả" name="description" edit={product.description} />
                        <TextFieldCusDis label="Tên sản phẩm" name="name" edit={product.name} />
                        <TextFieldCusDis label="Vật liệu" name="material" edit={product.material} />
                        <TextFieldCusDis label="Nguồn gốc" name="orgin" edit={product.orgin} />
                        <TextFieldCusDis label="Giá" name="price" edit={product.price} />
                        <CategorySelectField label="Danh mục" categoryOptions={categoriesC} edit={product.subcategoryId._id} name="subcategoryId" />
                        <SelectField label="Trạng thái" name="status" edit={product.status} />
                        <ProductSizeAColorDetailForm product={product._id} />
                        <ProductSaleDetailForm product={product._id} />
                      </Grid>
                    </CardContent>
                    <Divider />
                  </Card>
                </Grid>
              </Grid>
            </Container>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
              }}
            >
              <Button onClick={handleClose} color="primary">
                Huỷ
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductsDetailForm;
