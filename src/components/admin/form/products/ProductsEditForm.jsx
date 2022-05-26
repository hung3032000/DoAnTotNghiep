import { Box, Button, Card, Dialog, DialogContent, Grid, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectField from 'components/admin/form/common/SelectField/index';
import TextFieldCus from 'components/admin/form/common/TextField/index';
import CategorySelectField from 'components/admin/form/common/SelectField/category';
import IdField from 'components/admin/form/common/HiddenValue/index';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
ProductEditForm.propTypes = {
  product: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  categoriesC: PropTypes.array.isRequired,
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
      photo: product.image,
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
    if (selectedFiles && selectedFiles[0]) {
      const data = new FormData();
      data.append('photo', selectedFiles[0]);
      const { onSubmit } = props;
      if (onSubmit) {
        await onSubmit(values, data);
      }
    } else {
      const { onSubmit } = props;
      if (onSubmit) {
        await onSubmit(values);
      }
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <IconButton className="mgr-10" color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
        <DialogContent>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Thay đổi sản phẩm" {...a11yProps(0)} />
            <Tab label="Thay đổi sale" {...a11yProps(1)} />
            <Tab label="Thay đổi màu size" {...a11yProps(2)} />
          </Tabs>
          <Grid container spacing={3}>
            <Grid item>
              <Card>
                <TabPanel value={value} index={0}>
                  <form onSubmit={productsEditForm.handleSubmit(handleSubmit)}>
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
                          render={() => <TextField fullWidth type="file" accept=".jpg,.png" onChange={selectFile} variant="outlined" />}
                        />
                      </Grid>
                    </Grid>

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
                </TabPanel>
              </Card>
            </Grid>
          </Grid>
          <TabPanel value={value} index={1}>
            Đang phát triển
          </TabPanel>
          <TabPanel value={value} index={2}>
          Đang phát triển
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductEditForm;
