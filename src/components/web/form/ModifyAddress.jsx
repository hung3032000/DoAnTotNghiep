import React from 'react';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputCombobox from './inputCommon/inputCombobox';
import Input from './inputCommon/inputText';

// ModifyAddress.propTypes = {};

function ModifyAddress(props) {
  const addressform = useForm({
    defaultValues: {
      gender: '',
      lastname: '',
      fistname: '',
      company: '',
      phone: '',
      gender2: '',
      gender3: '',
      gender4: '',
    },
  });
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <form class="form-horizontal" onSubmit={addressform.handleSubmit(handleSubmit)}>
      <fieldset>
        <InputCombobox name="gender" form={addressform} />
        <Input name="lastname" form={addressform} placeholder="Tên *" />
        <Input name="firstname" form={addressform} placeholder="Họ *" />
        <Input name="company" form={addressform} placeholder="Công ty *" />
        <Input name="phone" form={addressform} placeholder="Số điện thoại *" />
        <InputCombobox name="gender2" form={addressform} />
        <InputCombobox name="gender3" form={addressform} />
        <InputCombobox name="gender4" form={addressform} />

        <p class="mandatory-fields">Tất cả các trường có dấu * là bắt buộc</p>
        <div class="form-row form-row-button">
          <button class="apply-button btn btn-outline-primary btn-full " type="submit" name="dwfrm_profile_address_edit" value="Apply">
            Apply
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default ModifyAddress;
