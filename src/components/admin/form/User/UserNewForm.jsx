import { Box, Button, Card, CardContent, Container, Dialog, DialogContent, DialogTitle, Divider, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextField from 'components/admin/form/common/TextField/index';
import SelectField from 'components/admin/form/common/SelectField/index';
import DateMonthField from 'components/admin/form/common/DateMonthField/index';
import PasswordField from 'components/admin/form/common/PasswordField/index';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

UserNewForm.propTypes = {
  onSubmit: PropTypes.func,
};

function UserNewForm(props) {
  const roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'SubAdmin', value: 'subadmin' },
    { label: 'User', value: 'user' },
  ];
  const genderOptions = [
    { label: 'Ông', value: 'Male' },
    { label: 'Bà', value: 'Female' },
  ];
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    email: yup.string().email('Please enter a valid email address.'),
    password: yup.string().required('Mật khẩu không hợp lệ').min(5, 'title'),
    phonenumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  });
  const userNewForm = useForm({
    defaultValues: {
      gender: '',
      lastname: '',
      fistname: '',
      email: '',
      password: '',
      phonenumber: '',
      role: '',
      date: '',
      month: '',
    },
    resolver: yupResolver(schema),
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
        Thêm người dùng
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth={true}>
        <DialogTitle id="form-dialog-title">Thêm người dùng mới</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              py: 3,
            }}
          >
            <form onSubmit={userNewForm.handleSubmit(handleSubmit)}>
              <Container>
                <Grid container spacing={3}>
                  <Grid item>
                    <Card>
                      <Divider />
                      <CardContent>
                        <Grid container spacing={3}>
                          <SelectField label="Ông/bà" name="gender" categoryOptions={genderOptions} form={userNewForm} />
                          <TextField label="Tên họ" name="lastname" form={userNewForm} />
                          <TextField label="Tên" name="fistname" form={userNewForm} />
                          <TextField label="Email" name="email" form={userNewForm} />
                          <PasswordField label="Mật khẩu" name="password" form={userNewForm} />
                          <TextField label="Số điện thoại" name="phonenumber" form={userNewForm} />
                          <DateMonthField date="date" month="month" form={userNewForm} />
                          <SelectField label="Quyền" name="role" categoryOptions={roleOptions} form={userNewForm} />
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

export default UserNewForm;
