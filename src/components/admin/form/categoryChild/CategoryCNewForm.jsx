import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid,TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextFieldCus from 'components/admin/form/common/TextField/index';
import SelectField from 'components/admin/form/common/SelectField/status';

CategoryCNewForm.propTypes = {
  category: PropTypes.array.isRequired,
  onSubmit: PropTypes.func,
};

function CategoryCNewForm(props) {
  const { category } = props;
  const categoryCNewForm = useForm({
    defaultValues: {
      namesubCategory: '',
      nameCategory: '',
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
      {/* <Button>Nhập</Button>
      <Button sx={{ mx: 1 }}>Export</Button> */}
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Thêm danh mục con
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Thêm danh mục con mới</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form autoComplete="off" onSubmit={categoryCNewForm.handleSubmit(handleSubmit)}>
              <Container>
                <Card>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <TextFieldCus label="Tên danh mục con" name="namesubCategory" widthCustome={12} form={categoryCNewForm} />
                      <SelectField label="Danh mục" name="status" widthCustome={12} categoryOptions={category} form={categoryCNewForm} />
                      <Grid item md={12} xs={12}>
                        <Controller
                          name="photo"
                          defaultValue
                          control={categoryCNewForm.control}
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

export default CategoryCNewForm;
