import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
// import * as yup from 'yup';
import Input from './inputCommon/inputText';
import InputCombobox from './inputCommon/inputCombobox';
import InputData from './inputCommon/inputData';
import DateTimePicker from './inputCommon/dateTimePicker';


UpdateInfoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function UpdateInfoForm(props) {
  const dataUser = useSelector((state) => state.user.current);
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // const schema = yup.object().shape({
  //   fName: yup.string().required('The fName address is invalid'),
  //   lName: yup.string().required('The lName address is invalid'),
  //   address: yup.string().required('The fName address is invalid'),
  //   phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  //   email: yup.string().required('The e-mail address is invalid').email(),
  //   password: yup.string().required('Please enter a password containing at least 8 characters, with 1 number and 1 uppercase letter').min(5, 'title'),
  // });
  const updateForm = useForm({
    defaultValues: {
      email: dataUser.email,
      gender: dataUser.gender,
      lastname: dataUser.lastname,
      fistname: dataUser.fistname,
      // address: dataUser.addresses[0].city,
      phoneNumber: dataUser.phonenumber,
      date: dataUser.date ? dataUser.date : 0,
      month: dataUser.month ? dataUser.month : 0,
    },
    // resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <>
      <form className="form-horizontal edit-account-form" id="RegistrationForm" onSubmit={updateForm.handleSubmit(handleSubmit)}>
        <p className="required-msg">Tất cả các trường có dấu * là bắt buộc</p>
        <div className="error-form global-error form-row" aria-live="polite" />
        <fieldset>
          <legend className="visually-hidden">Thông tin cá nhân</legend>
          <InputCombobox name="gender" form={updateForm}/>
          <Input defaultValue={dataUser.fistname} name="fistname" form={updateForm} label="Họ *"/>
          <Input defaultValue={dataUser.lastname} name="lastname" form={updateForm} label="Tên *"/>
          <DateTimePicker userDate={dataUser.date} userMonth={dataUser.month} form={updateForm} />
          <Input defaultValue={dataUser.phonenumber} name="phonenumber" form={updateForm} label="Số điện thoại"/>
          <InputData name="email" defaultValue={dataUser.email} form={updateForm}/>
          <div className="form-row form-row-button">
            <button type="submit" value="Apply" name="dwfrm_profile_confirm">
              Lưu thay đổi
            </button>
          </div>
          {/* <div className="form-row form-row-button">
            <button type="button" className="delete-account" value="Delete account" name="dwfrm_profile_deleteaccount">
              Xoá tài khoản
            </button>
          </div> */}
        </fieldset>
      </form>
    </>
  );
}

export default UpdateInfoForm;
