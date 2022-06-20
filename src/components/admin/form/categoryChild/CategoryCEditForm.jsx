import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import IdField from 'components/admin/form/common/HiddenValue/index';
import TextFieldCus from 'components/admin/form/common/TextField/index';
import SelectField from 'components/admin/form/common/SelectField/status';
import SelectFieldStatus from 'components/admin/form/common/SelectField/index';
import { Controller, useForm } from 'react-hook-form';

CategoryCEditForm.propTypes = {
  category: PropTypes.array.isRequired,
  categoryC: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

function CategoryCEditForm(props) {
  const { category, categoryC } = props;
  const statusOptions = [
    { label: 'Sử dụng', value: true },
    { label: 'Khoá', value: false },
  ];
  const categoryEditForm = useForm({
    defaultValues: {
      _id: categoryC._id,
      namesubCategory: categoryC.namesubCategory,
      substatus: categoryC.substatus,
      categoryID: categoryC.categoryID._id,
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
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
  //Display image
  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton className="mgr-10" color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Cập nhập thông tin danh mục con</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form autoComplete="off" onSubmit={categoryEditForm.handleSubmit(handleSubmit)}>
              <Container>
                <Card>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <IdField name="_id" form={categoryEditForm} />
                      <TextFieldCus label="Tên danh mục con" name="namesubCategory" edit={categoryC.namesubCategory} widthCustome={12} form={categoryEditForm} />
                      <SelectField label="Danh mục" name="categoryID" edit={categoryC.categoryID._id}  widthCustome={12} categoryOptions={category} form={categoryEditForm} />
                      <SelectFieldStatus label="Trạng thái" name="substatus" edit={categoryC.substatus}  categoryOptions={statusOptions} form={categoryEditForm} />    
                      <Grid item md={6} xs={12}>
                        <Controller
                          name="photo"
                          defaultValue
                          control={categoryEditForm.control}
                          render={() => <TextField fullWidth={true} type="file" accept=".jpg,.png" onChange={selectFile} variant="outlined" />}
                        />
                      </Grid>
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

export default CategoryCEditForm;
