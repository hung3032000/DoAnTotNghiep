import { Box, Button, Container, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextFieldCusDis from 'components/admin/form/common/TextFieldDisable/index';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getSizeProduct } from 'slice/SizeAColor';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Loader from 'components/fullPageLoading';

ProductSizeAColorDetailForm.propTypes = {
  product: PropTypes.any,
};

function ProductSizeAColorDetailForm(props) {
  const dataSizeList = useSelector((state) => state.sizeAcolor.size);
  const { product } = props;
  const dispatch = useDispatch();
  const [totalProductState, setTotalProductState] = useState();
  const [loading, setLoading] = useState(false);

  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const actionChild = getSizeProduct(product);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, product]);
  //fetch data category
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setTotalProductState(0);
        let totalProduct = 0;
        for (let size of dataSizeList) {
          setLoading(true);
          let colors = size.colors;
          let totalQuantity = 0;
          for (let color of colors) {
            totalQuantity += color.quantity;
          }
          totalProduct += totalQuantity;
          setTotalProductState(totalProduct);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataSizeList, dispatch]);
  console.log(totalProductState);
  const handleClose = () => {
    setOpen(false);
  };

  const arrayFilter = () => {
    let array = [];
    dataSizeList.forEach((i) => {
      i.colors.forEach((i2) => {
        array.push({ _id: i._id, nameColor: i2.colorName, nameSize: i.nameSize, quantity: i2.quantity });
      });
    });
    return array;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Loader showLoader={loading} />
      <TextFieldCusDis
        label="Tổng Số lượng"
        name="quantity"
        edit={totalProductState ? totalProductState : 0}
        InputProps={{
          endAdornment: (
            <Button color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
              Xem chi tiết
            </Button>
          ),
        }}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
        <DialogTitle id="form-dialog-title">Thông tin size và màu</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <Container>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Size</TableCell>
                      <TableCell>Màu</TableCell>
                      <TableCell>Số Lượng</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {arrayFilter().map((size, index) => (
                      <TableRow hover key={index}>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex',
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              {size._id}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{size.nameSize}</TableCell>
                        <TableCell>{size.nameColor}</TableCell>
                        <TableCell>{size.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default ProductSizeAColorDetailForm;
