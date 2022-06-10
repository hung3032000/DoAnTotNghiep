import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from 'components/admin/form/common/TextField/index';
import SelectField from 'components/admin/form/common/SelectField/index';
import DateMonthField from 'components/admin/form/common/DateMonthField/index';
import EmailField from 'components/admin/form/common/HiddenValue/index';
import IdField from 'components/admin/form/common/HiddenValue/index';

UserEditForm.propTypes = {
  customer: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

function UserEditForm(props) {
  const { customer } = props;
  const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'SubAdmin', value: 'subadmin' },
    { label: 'User', value: 'user' },
  ];
  const genderOptions = [
    { label: 'Ông', value: 'Male' },
    { label: 'Bà', value: 'Female' },
  ];
  const statusOptions = [
    { label: 'Sử dụng', value: true },
    { label: 'Khoá', value: false },
  ];
  const userNewForm = useForm({
    defaultValues: {
      _id: customer._id,
      email: customer.email,
      gender: customer.gender,
      lastname: customer.lastname,
      fistname: customer.fistname,
      phonenumber: customer.phonenumber,
      role: customer.role,
      date: customer.date,
      month: customer.month,
      status: customer.status,
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
        <DialogTitle id="form-dialog-title">Cập nhập thông tin</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form autoComplete="off" onSubmit={userNewForm.handleSubmit(handleSubmit)}>
              <Container>
                <Grid container spacing={3}>
                  <Grid item>
                    <Card>
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <SelectField label="Ông/bà" name="gender" edit={customer.gender} categoryOptions={genderOptions} form={userNewForm} />
                          <EmailField name="email" form={userNewForm} />
                          <IdField name="_id" form={userNewForm} />
                          <TextField label="Tên họ" name="lastname" edit={customer.lastname} form={userNewForm} />
                          <TextField label="Tên" name="fistname" edit={customer.fistname} form={userNewForm} />
                          <TextField label="Số điện thoại" name="phonenumber" edit={customer.phonenumber} form={userNewForm} />
                          <DateMonthField date="date" month="month" form={userNewForm} />
                          <SelectField label="Quyền" name="role" edit={customer.role} categoryOptions={roleOptions} form={userNewForm} />
                          <SelectField label="Trạng thái" name="status" edit={customer.status} categoryOptions={statusOptions} form={userNewForm} />
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

export default UserEditForm;
