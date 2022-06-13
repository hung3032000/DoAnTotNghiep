import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Input from './inputCommon/inputText';
import InputCombobox from './inputCommon/inputCombobox';
import InputData from './inputCommon/inputData';
import DateTimePicker from './inputCommon/dateTimePicker';

UpdateInfoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function UpdateInfoForm(props) {
  const dataUser = useSelector((state) => state.user.current);
  const updateForm = useForm({
    defaultValues: {
      email: dataUser.email,
      gender: dataUser.gender,
      lastname: dataUser.lastname,
      fistname: dataUser.fistname,
      phoneNumber: dataUser.phonenumber,
      date: dataUser.date ? dataUser.date : 0,
      month: dataUser.month ? dataUser.month : 0,
    },
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };


  return (
    <form className="form-horizontal edit-account-form" id="RegistrationForm" onSubmit={updateForm.handleSubmit(handleSubmit)}>
      <p className="required-msg">Tất cả các trường có dấu * là bắt buộc</p>
      <div className="error-form global-error form-row" aria-live="polite" />
      <fieldset>
        <legend className="visually-hidden">Thông tin cá nhân</legend>
        <InputCombobox name="gender" form={updateForm} />
        <Input defaultValue={dataUser.fistname} name="fistname" form={updateForm} label="Họ *" />
        <Input defaultValue={dataUser.lastname} name="lastname" form={updateForm} label="Tên *" />
        <DateTimePicker userDate={dataUser.date} userMonth={dataUser.month} form={updateForm} />
        <Input defaultValue={dataUser.phonenumber} name="phonenumber" form={updateForm} label="Số điện thoại" />
        <InputData name="email" defaultValue={dataUser.email} form={updateForm} />
        <div className="form-row form-row-button">
          <button type="submit" value="Apply" name="dwfrm_profile_confirm">
            Lưu thay đổi
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default UpdateInfoForm;
