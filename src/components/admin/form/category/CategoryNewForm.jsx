import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from 'components/admin/form/common/TextField/index';
CategoryNewForm.propTypes = {
  onSubmit: PropTypes.func,
};
function CategoryNewForm(props) {
  const categoryNewForm = useForm({
    defaultValues: {
      nameCategory: '',
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
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Thêm danh mục
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth="true">
        <DialogTitle id="form-dialog-title">Thêm danh mục mới</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form onSubmit={categoryNewForm.handleSubmit(handleSubmit)}>
              <Container>
                <Card>
                  <Divider />
                  <CardContent>
                    <Grid container>
                      <TextField label="Tên danh mục" name="nameCategory" widthCustome={12} form={categoryNewForm} />
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

export default CategoryNewForm;
