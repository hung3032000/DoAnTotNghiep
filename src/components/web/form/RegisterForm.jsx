import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputCombobox from './inputCommon/inputCombobox';
import Input from './inputCommon/inputText';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    fistname: yup.string().required('The fName address is invalid'),
    lastname: yup.string().required('The lName address is invalid'),
    email: yup.string().required('The e-mail address is invalid').email(),
    password: yup.string().required('Please enter a password containing at least 8 characters, with 1 number and 1 uppercase letter').min(5, 'title'),
  });
  const registerForm = useForm({
    defaultValues: {
      gender: '',
      lastname: '',
      fistname: '',
      email: '',
      password: '',
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
    <form className="form-horizontal edit-account-form" onSubmit={registerForm.handleSubmit(handleSubmit)}>
      {/* id="form-register" */}
      <p className="required-msg">Hãy điền đầy đủ các thông tin bên dưới</p>
      <div className="error-form global-error form-row" aria-live="polite" />
      <fieldset>
        <InputCombobox name="gender" form={registerForm} />
        <Input name="fistname" form={registerForm} label="Họ *" />
        <Input name="lastname" form={registerForm} label="Tên *" />
        <Input name="email" form={registerForm} label="Địa chỉ E-mail *" />
        <Input name="password" form={registerForm} isPassword={true} label="Mật khẩu *" />
        <div className="form-row form-secondaryCheckbox form-customCheckbox" data-requiredtext data-regexinvalidmessage>
          <div className="form-field-wrapper">
            <input
              className="form-checkbox addtoemaillist"
              type="checkbox"
              id="dwfrm_profile_customer_addtoemaillist"
              name="dwfrm_profile_customer_addtoemaillist"
              defaultValue="true"
            />
            <label className="form-label" htmlFor="dwfrm_profile_customer_addtoemaillist">
              Tôi đồng ý
            </label>
          </div>
        </div>
        <div className="form-row form-row-button">
          <input type="hidden" defaultValue="new" name="action" />
          <button type="submit" value="Apply" name="dwfrm_profile_confirm">
            Tạo tài khoản
          </button>
        </div>
        <div className="form-row form-row-button">
          <a href="/login"> Đã có tài khoản? Tới đăng nhập </a>
        </div>
      </fieldset>
    </form>
  );
}

export default RegisterForm;
