import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import IdField from 'components/admin/form/common/HiddenValue/index';
import TextField from 'components/admin/form/common/TextField/index';
import DateTimeField from 'components/admin/form/common/DateTimePicker';

VoucherEditForm.propTypes = {
  vouchers: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

function VoucherEditForm(props) {
  const { vouchers } = props;
  function reConvert(date) {
    const MyDateString = date.year + '-' + ('0' + (date.month)).slice(-2) + '-' + ('0' + date.day).slice(-2);
    return MyDateString;
  }
  const voucherEditForm = useForm({
    defaultValues: {
      _id: vouchers._id,
      nameVouncher: vouchers.nameVouncher,
      description: vouchers.description,
      priceOrderLimit: vouchers.priceOrderLimit,
      discountPercent: vouchers.discountPercent,
      statusCoupon: vouchers.statusCoupon,
      dateStart: {
        day: vouchers.dateStart.day,
        month: vouchers.dateStart.month,
        year: vouchers.dateStart.year,
        hour: 0,
        minute: 0,
        second: 0,
      },
      dateEnd: {
        day: vouchers.dateEnd.day,
        month: vouchers.dateEnd.month,
        year: vouchers.dateEnd.year,
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
    return [parseInt(date), parseInt(month), parseInt(year)];
  }
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (values.dateStart.day === undefined && values.dateEnd.day === undefined) {
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
      values.dateEnd = {
        day: dateEnd[0],
        month: dateEnd[1],
        year: dateEnd[2],
        hour: 24,
        minute: 59,
        second: 59,
      };
    } else if (values.dateStart.day === undefined) {
      const dateStart = convertDate(values.dateStart);
      values.dateStart = {
        day: dateStart[0],
        month: dateStart[1],
        year: dateStart[2],
        hour: 0,
        minute: 0,
        second: 0,
      };
    } else if (values.dateEnd.day === undefined) {
      const dateEnd = convertDate(values.dateEnd);
      values.dateEnd = {
        day: dateEnd[0],
        month: dateEnd[1],
        year: dateEnd[2],
        hour: 24,
        minute: 59,
        second: 59,
      };
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
      <IconButton className="mgr-10" color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Cập nhập mã giảm giá</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form autoComplete="off" onSubmit={voucherEditForm.handleSubmit(handleSubmit)}>
              <Container>
                <Card>
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <TextField label="Mã giảm giá" name="nameVouncher" edit={vouchers.nameVouncher} widthCustome={6} form={voucherEditForm} />
                      <TextField label="Mô tả" name="description" edit={vouchers.description} widthCustome={6} form={voucherEditForm} />
                      <TextField label="Giảm giá(%)" name="discountPercent" edit={vouchers.discountPercent} widthCustome={6} form={voucherEditForm} />
                      <TextField label="Giảm tối đa" name="priceOrderLimit" edit={vouchers.priceOrderLimit} widthCustome={6} form={voucherEditForm} />
                      <DateTimeField label="Ngày bắt đầu" name="dateStart" edit={reConvert(vouchers.dateStart)} widthCustome={6} form={voucherEditForm} />
                      <DateTimeField label="HSD" name="dateEnd" edit={reConvert(vouchers.dateEnd)} widthCustome={6} form={voucherEditForm} />
                      <IdField name="_id" form={voucherEditForm} />
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

export default VoucherEditForm;
