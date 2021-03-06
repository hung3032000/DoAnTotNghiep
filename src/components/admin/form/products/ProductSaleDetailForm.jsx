import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, Divider, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextFieldCusDis from 'components/admin/form/common/TextFieldDisable/index';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { deleteSale, getSale, updateSale } from 'slice/SaleSlice';
import Loader from 'components/fullPageLoading';
import { Link } from 'react-router-dom';
import ProductEditSale from './ProductEditSale';

ProductSaleDetailForm.propTypes = {
  product: PropTypes.any,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ProductSaleDetailForm(props) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const saleData = useSelector((state) => state.sale.data);
  const { productId } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const actionChild = getSale(productId);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, productId]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const action = deleteSale(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    values.productId = productId;
    values.statusSale = true;
    values._id = saleData.sale._id;
    try {
      setLoading(true);
      const action = updateSale(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader showLoader={loading} />
      <TextFieldCusDis
        label="T???ng M?? Gi???m gi??"
        name="Sale"
        edit={saleData.status === true ? '??ang Sale' : 'Kh??ng c?? ch????ng tr??nh sale'}
        InputProps={{
          endAdornment: (
            <Button color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
              Xem chi ti???t
            </Button>
          ),
        }}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogContent>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Xem chi ti???t sale" {...a11yProps(0)} />
            <Tab label="Thay ?????i sale" {...a11yProps(1)} />
          </Tabs>

          <TabPanel value={value} index={0}>
            {saleData.sale ? (
              <>
                <Container>
                  <Card>
                    <Divider />
                    <CardContent>
                      <Grid container spacing={4}>
                        <TextFieldCusDis widthCustome={12} label="T??n s???n ph???m" name="percentSale" edit={saleData.sale.productId.name} />
                        <TextFieldCusDis widthCustome={6} label="M?? gi???m gi??" name="nameSale" edit={saleData.sale.nameSale} />
                        <TextFieldCusDis widthCustome={6} label="M?? t???" name="description" edit={saleData.sale.description} />
                        <TextFieldCusDis widthCustome={6} label="Gi???m gi??(%)" name="percentSale" edit={saleData.sale.percentSale} />
                        <TextFieldCusDis widthCustome={6} label="Tr???ng th??i" name="percentSale" edit={saleData.status === true ? '??ang Sale' : 'Kh??ng c?? ch????ng tr??nh sale'} />
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
                  <Button onClick={() => handleDelete(saleData.sale._id)} color="primary">
                    Xo??
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Hu???
                  </Button>
                </Box>
              </>
            ) : (
              <p>
                Hi???n ch??a c?? ch????ng tr??nh gi???m gi??{' '}
                <Link to={`/saleA/newSale/${productId}`} style={{ float: 'right', padding: 0 }}>
                  Th??m m???i
                </Link>
              </p>
            )}
          </TabPanel>
          {saleData.sale && (
            <TabPanel value={value} index={1}>
              <ProductEditSale saleData={saleData} productId={productId} onSubmit={handleSubmit} />
            </TabPanel>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductSaleDetailForm;
