import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from 'components/admin/form/common/TextField/index';
import DateTimeField from 'components/admin/form/common/DateTimePicker';
VoucherNewForm.propTypes = {
  onSubmit: PropTypes.func,
};
function VoucherNewForm(props) {
  const voucherNewForm = useForm({
    defaultValues: {
      _id: '',
      nameVouncher: '',
      description: '',
      priceOrderLimit: '',
      discountPercent: '',
      statusCoupon: true,
      dateStart: {
        day: '',
        month: '',
        year: '',
        hour: 0,
        minute: 0,
        second: 0,
      },
      dateEnd: {
        day: '',
        month: '',
        year: '',
        hour: 24,
        minute: 59,
        second: 59,
      },
    },
    // resolver: yupResolver(schema),
  });
  function convertDate(values) {
    const year = values.slice(0, 4);
    const month = values.slice(5, 7);
    const date = values.slice(8, 10);
    return [parseInt(date),parseInt(month),parseInt(year)];
  }
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    const dateStart = convertDate(values.dateStart);
    const dateEnd = convertDate(values.dateEnd);
    values.dateStart = {
      day: dateStart[0],
      month: dateStart[1],
      year: dateStart[2],
      hour: 0,
      minute: 0,
      second: 0,
    };
      values.dateEnd={
        day: dateEnd[0],
        month: dateEnd[1],
        year: dateEnd[2],
        hour: 24,
        minute: 59,
        second: 59,
    }
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
        Thêm mã giảm giá
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Thêm mã giảm giá mới</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form onSubmit={voucherNewForm.handleSubmit(handleSubmit)}>
              <Container>
                <Card>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <TextField label="Mã giảm giá" name="nameVouncher" widthCustome={6} form={voucherNewForm} />
                      <TextField label="Mô tả" name="description" widthCustome={6} form={voucherNewForm} />
                      <TextField label="Giảm giá(%)" number={true} max={99} name="discountPercent" widthCustome={6} form={voucherNewForm} />
                      <TextField label="Giảm tối đa" number={true} name="priceOrderLimit" widthCustome={6} form={voucherNewForm} />
                      <DateTimeField label="Ngày bắt đầu" name="dateStart" widthCustome={6} form={voucherNewForm} />
                      <DateTimeField label="HSD" name="dateEnd" widthCustome={6} form={voucherNewForm} />
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

export default VoucherNewForm;
