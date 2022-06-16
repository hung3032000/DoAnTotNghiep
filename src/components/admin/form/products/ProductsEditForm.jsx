import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectField from 'components/admin/form/common/SelectField/index';
import TextFieldCus from 'components/admin/form/common/TextField/index';
import CategorySelectField from 'components/admin/form/common/SelectField/category';
import IdField from 'components/admin/form/common/HiddenValue/index';
import Loader from 'components/fullPageLoading';

ProductEditForm.propTypes = {
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  categoriesC: PropTypes.array.isRequired,
};

function ProductEditForm(props) {
  const { product, categoriesC } = props;
  const statusOptions = [
    { label: 'Sử dụng', value: true },
    { label: 'Khoá', value: false },
  ];
  const productsEditForm = useForm({
    defaultValues: {
      _id: product._id,
      content: product.content,
      photo: product.imageMain,
      description: product.description,
      name: product.name,
      material: product.material,
      orgin: product.orgin,
      price: product.price,
      status: product.status,
      subcategoryId: product.subcategoryId._id,
    },
    // resolver: yupResolver(schema),
  });
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (selectedFiles && selectedFiles[0]) {
        const data = new FormData();
        data.append('photo', selectedFiles[0]);
        const { onSubmit } = props;
        if (onSubmit) {
          await onSubmit(values, data);
          console.log(data);
        }
      } else {
        const { onSubmit } = props;
        if (onSubmit) {
          await onSubmit(values);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  //Display image
  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Loader showLoader={loading} />
      <IconButton className="mgr-10" color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Cập nhập thông tin</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form onSubmit={productsEditForm.handleSubmit(handleSubmit)}>
              <Container>
                <Grid container spacing={3}>
                  <Grid item>
                    <Card>
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <TextFieldCus label="Content" name="content" edit={product.content} form={productsEditForm} />
                          <TextFieldCus label="Mô tả" name="description" edit={product.description} form={productsEditForm} />
                          <TextFieldCus label="Tên sản phẩm" name="name" edit={product.name} form={productsEditForm} />
                          <TextFieldCus label="Vật liệu" name="material" edit={product.material} form={productsEditForm} />
                          <TextFieldCus label="Nguồn gốc" name="orgin" edit={product.orgin} form={productsEditForm} />
                          <TextFieldCus label="Giá" name="price" edit={product.price} form={productsEditForm} />
                          <CategorySelectField label="Danh mục" categoryOptions={categoriesC} edit={product.subcategoryId._id} name="subcategoryId" form={productsEditForm} />
                          <IdField name="_id" form={productsEditForm} />
                          <SelectField label="Trạng thái" name="status" edit={product.status} categoryOptions={statusOptions} form={productsEditForm} />
                          <Grid item md={12} xs={12}>
                            <Controller
                              name="photo"
                              control={productsEditForm.control}
                              render={() => <TextField fullWidth={true} type="file" accept=".jpg,.png" onChange={selectFile} variant="outlined" />}
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

export default ProductEditForm;
