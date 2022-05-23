import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Input from './inputCommon/inputText';

ChangePassForm.propTypes = {
  onSubmit: PropTypes.func,
};

function ChangePassForm(props) {
  const updatePassForm = useForm({
    defaultValues: {
      passwordOld: '',
      passwordNew: '',
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
      <form className="form-horizontal" id="ChangePassowrdForm" onSubmit={updatePassForm.handleSubmit(handleSubmit)}>
        <fieldset>
          <legend className="visually-hidden">Tạo mật khẩu mới</legend>
          <Input name="passwordOld" form={updatePassForm} isPassword={true} label="Mật khẩu cũ *" />
          <Input name="passwordNew" form={updatePassForm} isPassword={true} label="Mật khẩu mới *" />
          <div className="form-row" data-requiredtext data-regexinvalidmessage aria-required="true">
            <div className="form-caption" id="profile_login_password-instruction">
              Vui lòng nhập mật khẩu có ít nhất 8 ký tự, với 1 số và 1 ký tự viết hoa.
            </div>
          </div>
          {/* <UserRetypePasword name="retypeNewPass" formUserRetypePassword={updatePassForm}/> */}
          <div className="form-row form-row-button">
            <button type="submit" value="Apply" name="dwfrm_profile_changepassword">
              Xác nhận
            </button>
          </div>
        </fieldset>
      </form>
  );
}

export default ChangePassForm;
