import { Box, Button, Card, Dialog, DialogContent, Grid, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectField from 'components/admin/form/common/SelectField/index';
import TextFieldCus from 'components/admin/form/common/TextField/index';
import CategorySelectField from 'components/admin/form/common/SelectField/category';
import IdField from 'components/admin/form/common/HiddenValue/index';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import TableRow from 'components/admin/dynamicForm/index';
import { getSizeById } from 'slice/SizeAColor';
import adminAPI from 'api/adminAPI';
import Loader from 'components/fullPageLoading';

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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  // const [loading, setLoading] = useState(false);

  const statusOptions = [
    { label: 'Sử dụng', value: true },
    { label: 'Khoá', value: false },
  ];
  const dataSize = useSelector((state) => state.sizeAcolor.sizeA);

  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);
        const actionChild = getSizeById(14);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      }
      //  finally {
      //   setLoading(false);
      // }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (dataSize <= 0) {
      setInputList([{ index: Math.random() }]);
    } else {
      let item;
      let list = [];
      for (let index = 0; index < dataSize.colors.length; index++) {
        item = {
          index: Math.random(),
          productId: dataSize.productId,
          nameSize: dataSize.nameSize,
          color: dataSize.colors[index].colorName,
          quantity: dataSize.colors[index].quantity,
        };
        list.push(item);
      }
      setInputList(list);
    }
  }, [dataSize]);

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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [inputList, setInputList] = useState([{ index: Math.random() }]);
  // handle submit form
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      let color, quantity;
      let temp = [];
      let data = {};
      data.nameSize = inputList[0].size ? inputList[0].size : dataSize.nameSize;
      data.productId = product._id;
      for (let index = 0; index < inputList.length; index++) {
        color = inputList[index].color + '';
        quantity = parseInt(inputList[index].quantity);
        temp.push({ colorName: color, quantity: quantity });
      }
      data.colors = temp;
      setLoading(true);
      adminAPI
        .updateSizeAColor(14, data)
        .then((res) => {
          window.localtion.reload();
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message);
          }
        })
        .finally(() => {
          window.location.reload();
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        index: Math.random(),
      },
    ]);
  };
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loader showLoader={loading} />
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
          <TabPanel value={value} index={2}>
            <form onSubmit={handleSubmit2}>
              <div className="rule-engine-content">
                <h5 className="content-title">Size và Màu</h5>
                <table className="table">
                  <thead className="table-head">
                    <tr>
                      <th className="table__th">Size</th>
                      <th className="table__th">Màu</th>
                      <th className="table__th">Số lượng</th>
                      <th className="table__th"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableRow inputList={inputList} setInputList={setInputList} />
                  </tbody>
                </table>
              </div>
              <Button type="button" className="rule-engine-btn btn-ellipsis" onClick={() => handleAddClick()}>
                +
              </Button>
              <div className="rule-engine-action">
                <Button type="submit" className="rule-engine-btn btn-save">
                  Save
                </Button>
                <Button type="button" className="rule-engine-btn btn-cancel" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </TabPanel>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductEditForm;
