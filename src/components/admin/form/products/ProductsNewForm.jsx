import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectField from 'components/admin/form/common/SelectField/category';
import TextFieldCus from 'components/admin/form/common/TextField/index';

ProductsNewForm.propTypes = {
  onSubmit: PropTypes.func,
  categoriesc: PropTypes.object,
};

function ProductsNewForm(props) {  
  const { categoriesC } = props;
  //Display image
  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const handleSubmit = async (values) => {
    const data = new FormData();
    data.append('photo', selectedFiles[0]);
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values, data);
    }
  };

  const productsNewForm = useForm({
    defaultValues: {
      content: '',
      description: '',
      name: '',
      material: '',
      orgin: '',
      price: '',
      subcategoryId: '',
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
      {/* <Button>Nhập</Button>
      <Button sx={{ mx: 1 }}>Export</Button> */}
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Thêm sản phẩm
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Thêm sản phẩm mới</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form onSubmit={productsNewForm.handleSubmit(handleSubmit)}>
              <Container>
                <Grid container spacing={3}>
                  <Grid item>
                    <Card>
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <TextFieldCus label="Content" name="content" form={productsNewForm} />
                          {/* <AProductOrigin name="images" formImages={productsNewForm} /> */}
                          <TextFieldCus label="Mô tả" name="description" form={productsNewForm} />
                          <TextFieldCus label="Tên sản phẩm" name="name" form={productsNewForm} />
                          <TextFieldCus label="Vật liệu" name="material" form={productsNewForm} />
                          <TextFieldCus label="Nguồn gốc" name="orgin" form={productsNewForm} />
                          <TextFieldCus label="Giá" name="price" form={productsNewForm} />
                          <SelectField categoryOptions={categoriesC} name="subcategoryId" form={productsNewForm} />
                          <Grid item md={6} xs={12}>
                            <Controller
                              name="photo"
                              control={productsNewForm.control}
                              render={() => <TextField fullWidth={true} required type="file" accept=".jpg,.png" onChange={selectFile} variant="outlined" />}
                            />
                          </Grid>
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

export default ProductsNewForm;
