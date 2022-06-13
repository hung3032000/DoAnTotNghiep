import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, TextField } from '@material-ui/core';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Loader from 'components/fullPageLoading';

ProductImageForm.propTypes = {
  productId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
};

function ProductImageForm(props) {
  const productsEditForm = useForm({
    defaultValues: {},
  });
  const {productId} = props;
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const data = new FormData();
      values._id = productId;
      for (let key = 0; key < 3; key++) {
        data.append("photo", selectedFiles[key]);
      }

      const { onSubmit } = props;
      if (onSubmit) {
        await onSubmit(values,data);
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
        <InsertPhotoIcon />
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
                <Card>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Controller
                          name="photo"
                          control={productsEditForm.control}
                          render={() => (
                            <TextField
                              fullWidth={true}
                              type="file"
                              accept=".jpg,.png"
                              inputProps={{
                                multiple: true,
                              }}
                              onChange={selectFile}
                              variant="outlined"
                            />
                          )}
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

export default ProductImageForm;
