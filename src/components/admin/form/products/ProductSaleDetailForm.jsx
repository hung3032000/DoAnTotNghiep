import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextFieldCusDis from 'components/admin/form/common/TextFieldDisable/index';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getSale } from 'slice/SaleSlice';
import Loader from 'components/fullPageLoading';

ProductSaleDetailForm.propTypes = {
  product: PropTypes.any,
};

function ProductSaleDetailForm(props) {
  const saleData = useSelector((state) => state.sale.data);
  const { productId } = props;
  console.log(saleData);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);

        //categoryC
        const actionChild = getSale(productId);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    })();
  }, [dispatch, productId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Loader showLoader={loading} />
      <TextFieldCusDis
        label="Tổng Mã Giảm giá"
        name="Sale"
        edit={saleData.status === true ? 'Đang Sale' : 'Không có chương trình sale'}
        InputProps={{
          endAdornment: (
            <Button color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
              Xem chi tiết
            </Button>
          ),
        }}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
        <DialogContent>
          <Box
            style={{ backgroundColor: '#ffff' }}
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <Container>
              <Card>
                <Divider />
                <CardContent>
                  <Grid container spacing={4}>
                    {saleData.sale ? (
                      <>
                        <TextFieldCusDis widthCustome={12} label="Tên sản phẩm" name="percentSale" edit={saleData.sale.productId.name} />
                        <TextFieldCusDis widthCustome={6} label="Mã giảm giá" name="nameSale" edit={saleData.sale.nameSale} />
                        <TextFieldCusDis widthCustome={6} label="Mô tả" name="description" edit={saleData.sale.description} />
                        <TextFieldCusDis widthCustome={6} label="Giảm giá(%)" name="percentSale" edit={saleData.sale.percentSale} />
                        <TextFieldCusDis widthCustome={6} label="Trạng thái" name="percentSale" edit={saleData.status === true ? 'Đang Sale' : 'Không có chương trình sale'} />
                      </>
                    ) : (
                      ''
                    )}
                  </Grid>
                </CardContent>
                <Divider />
              </Card>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductSaleDetailForm;
