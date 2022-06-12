import React from 'react';
import Input from './inputCommon/inputText';
import InputCombobox from './inputCommon/inputCombobox';
import InputDisabled from './inputCommon/inputDisable';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
CheckOutForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CheckOutForm(props) {
  const dataUser = useSelector((state) => state.user.current);
  const schema = yup.object().shape({
    LName: yup.string().required('Họ không hợp lệ'),
    FName: yup.string().required('Tên không hợp lệ'),
    Address: yup.string().required('Địa chỉ không hợp lệ'),
    Phone: yup.string().required('Số điện thoại không hợp lệ'),
  });
  const checkOutForm = useForm({
    defaultValues: {
      LName: '',
      FName: '',
      Address: '',
      Title: 'Male',
      Phone: '',
    },
    resolver: yupResolver(schema),
  });


  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (

      <form
        onSubmit={checkOutForm.handleSubmit(handleSubmit)}
        className="shipping-address-select-form"
      >
        <div className="checkout-box shipping-address-box">
          <h3 className="info-perso">Thông tin cá nhân</h3>
          <InputDisabled name="email" defaultValue={dataUser.email} label="Địa chỉ Email"/>
          <h3>Địa chỉ giao hàng</h3>
          <InputCombobox name="Title" form={checkOutForm} label="Ông/Bà"/>
          <Input name="LName" form={checkOutForm} label="Họ"/>
          <Input name="FName" form={checkOutForm} label="Tên"/>
          <Input name="Address" form={checkOutForm} label="Địa chỉ"/>
          <Input name="Phone" form={checkOutForm} label="Số điện thoại"/>
          <div className="billing-address">
            <button className="form-button shipping-address-save" name="dwfrm_singleshipping_shippingAddress_save">
              Thanh toán
            </button>
            <a className="checkout-back-to-cart" href="/usercart">
              Quay lại giỏ hàng
            </a>
          </div>
        </div>
      </form>

  );
}

export default CheckOutForm;
