import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

import Button from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { formatPrice } from 'utils';

OrderListInfo.propTypes = {
  order: PropTypes.object,
};

function OrderListInfo(props) {
  const { order } = props;
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const orderItems = order?.items;
  return (
    <>
      <IconButton aria-label="info" onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Chi tiết đơn hàng</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Tên khách hàng</TableCell>
                    <TableCell align="right">Ngày tạo đơn</TableCell>
                    <TableCell align="right">Địa chỉ</TableCell>
                    <TableCell align="right">Số điện thoại</TableCell>
                    <TableCell align="right">Phương thức thanh toán</TableCell>
                    <TableCell align="right">Trạng thái</TableCell>
                    <TableCell align="right">Tổng giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Button aria-label="expand row" size="small" onClick={() => setOpen1(!open1)}>
                        {open1 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </Button>
                    </TableCell>
                    <TableCell>{order?.userId.fistname + ' ' + order?.userId.lastname}</TableCell>
                    <TableCell align="right">{moment(order?.createdAt).format('DD/MM/YYYY')}</TableCell>
                    <TableCell align="right">{order?.addressrecevie.address}</TableCell>
                    <TableCell align="right">{order?.addressrecevie.phonenumber}</TableCell>
                    <TableCell align="right">{order?.paymentMethod}</TableCell>

                    <TableCell align="right">{order?.status}</TableCell>
                    <TableCell align="right">{formatPrice(order?.totalPrice)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                      <Collapse in={open1} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                          <Typography variant="h6" gutterBottom component="div">
                            Đơn hàng
                          </Typography>
                          <Table size="big" aria-label="purchases">
                            <TableHead>
                              <TableRow>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell align="right">Giá thành</TableCell>
                                <TableCell align="right">Giảm giá</TableCell>
                                <TableCell align="right">Tổng giá trị (VND)</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {orderItems?.map((items) => (
                                <TableRow key={items._id}>
                                  <TableCell component="th" scope="row">
                                    <a className="minicart-product-name cursor" href={`/productinf/${items.productId._id}`} title={items.productId.name}>
                                      {items.productId.name}
                                    </a>
                                  </TableCell>
                                  <TableCell>{items.quantity}</TableCell>
                                  <TableCell align="right">{formatPrice(items.productId.price)}</TableCell>
                                  <TableCell align="right">{formatPrice(order.priceDiscount ? order.priceDiscount : 0)}</TableCell>
                                  {order?.paymentMethod === 'Paypal' ? <TableCell align="right">{formatPrice(items.totalPrice*20000)}</TableCell> : <TableCell align="right">{formatPrice(items.totalPrice)}</TableCell>}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OrderListInfo;
