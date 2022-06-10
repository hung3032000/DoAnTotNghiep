import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IdField from 'components/admin/form/common/HiddenValue/index';
import TextField from 'components/admin/form/common/TextField/index';
import SelectField from 'components/admin/form/common/SelectField/index';

CategoryEditForm.propTypes = {
  category: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

function CategoryEditForm(props) {
  const { category } = props;
  const statusOptions = [
    { label: 'Sử dụng', value: true },
    { label: 'Khoá', value: false },
  ];
  const categoryEditForm = useForm({
    defaultValues: {
      _id: category._id,
      nameCategory: category.nameCategory,
      status: category.status
    },
    // resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton className="mgr-10" color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Cập nhập danh mục</DialogTitle>
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
                      <TextField label="Tên danh mục" name="nameCategory" edit={category.nameCategory} widthCustome={12} form={categoryEditForm} />
                      <SelectField label="Trạng thái" name="status" edit={category.status} widthCustome={12} categoryOptions={statusOptions} form={categoryEditForm} />    
                      <IdField name="_id" form={categoryEditForm} />
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

export default CategoryEditForm;
