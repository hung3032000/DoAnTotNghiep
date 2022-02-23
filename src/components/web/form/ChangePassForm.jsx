import React from 'react';
import UserCurrentPassword from './inputFieldChangePassword/UserCurrentPassword';
import UserNewPassword from './inputFieldChangePassword/UserNewPassword';
// import UserRetypePasword from './inputFieldChangePassword/UserRetypePasword';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

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
    <div>
      <form className="form-horizontal" id="ChangePassowrdForm" onSubmit={updatePassForm.handleSubmit(handleSubmit)}>
        <fieldset>
          <legend className="visually-hidden">Create new password</legend>
          <UserCurrentPassword name="passwordOld" formUserCurrentPassword={updatePassForm}/>
          <UserNewPassword name="passwordNew" formUserNewPassword={updatePassForm}/>
          <div className="form-row" data-requiredtext data-regexinvalidmessage aria-required="true">
            <div className="form-caption" id="profile_login_password-instruction">
              Please enter a password containing at least 8 characters, with 1 number and 1 uppercase letter.
            </div>
          </div>
          {/* <UserRetypePasword name="retypeNewPass" formUserRetypePassword={updatePassForm}/> */}
          <div className="form-row form-row-button">
            <button type="submit" value="Apply" name="dwfrm_profile_changepassword">
              Apply
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ChangePassForm;
