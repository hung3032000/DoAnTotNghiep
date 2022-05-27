import { Box, Button, Container, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {  useForm } from 'react-hook-form';
import TextFieldCus from 'components/admin/form/common/TextField/index';
import IdField from 'components/admin/form/common/HiddenValue/index';

import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
ProductEditSizeAColor.propTypes = {
  data: PropTypes.any,
  onSubmit: PropTypes.func,
};

function ProductEditSizeAColor(props) {
  const { data } = props;
  const handleSubmit = async (values) => {
    console.log(values);
    const { onSubmit } = props;
    if (onSubmit) {
      //   await onSubmit(values);
    }
  };

  const productEditSizeAColor = useForm({
    defaultValues: {
      productId: data.productId,
      _id: data._id,
      nameSize: data.nameSize,
      colors: '',
    },
    // resolver: yupResolver(schema),
  });
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <Button className="mgr-10" color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
        <EditIcon />
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth="true">
        <DialogTitle id="form-dialog-title">Thêm sản phẩm mới</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form onSubmit={productEditSizeAColor.handleSubmit(handleSubmit)}>
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
                      <TableRow>
                        <TableCell>
                          <Box
                            sx={{
                              alignItems: 'center',
                              display: 'flex',
                            }}
                          >
                            <Typography color="textPrimary" variant="body1">
                              <IdField name="_id" form={productEditSizeAColor} />
                              {data._id}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <TextFieldCus name="nameSize" edit={data.nameSize} form={productEditSizeAColor} />
                        </TableCell>
                        <TableCell>
                          {data.colors.map((i, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <TextFieldCus name="colors" edit={i.colorName} form={productEditSizeAColor} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableCell>
                        <TableCell>
                          {data.colors.map((i, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <TextFieldCus name="colors2" edit={i.quantity} form={productEditSizeAColor} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 1,
                }}
              >
                <Button className="mgr-10" color="primary" variant="contained" type="submit">
                  Lưu
                </Button>
                <Button onClick={handleClose} color="primary">
                  Huỷ
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductEditSizeAColor;
