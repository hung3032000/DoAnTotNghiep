import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import RUserEmail from './inputFieldRegister/RUserEmail';
import RUserPassword from './inputFieldRegister/RUserPassword';
import UserFName from './inputFieldRegister/RUserFName';
import UserLName from './inputFieldRegister/RUserLName';
import UserTitle from './inputFieldRegister/RUserTitle';

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
      gender:'',
      lastname:'',
      fistname:'',
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
    <div>
      <form className="form-horizontal edit-account-form"  onSubmit={registerForm.handleSubmit(handleSubmit)}>
      {/* id="form-register" */}
        <p className="required-msg">Please fill out all fields</p>
        <div className="error-form global-error form-row" aria-live="polite" />
        <fieldset>
          <legend className="visually-hidden">Personal information</legend>
          <UserTitle name="gender" formRUserTitle={registerForm}/>
          <UserFName name="fistname" formRUserFName={registerForm}/>
          <UserLName name="lastname" formRUserLName={registerForm}/>
          <RUserEmail name="email" formRUserEmail={registerForm}/>
          <RUserPassword name="password" formRUserPassword={registerForm}/>
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
                I Agree
              </label>
            </div>
          </div>
          <div className="form-row form-row-button">
            <input type="hidden" defaultValue="new" name="action" />
            <button type="submit" value="Apply" name="dwfrm_profile_confirm">
              Create an account
            </button>
          </div>
          <div className="form-row form-row-button">
            <a href="/login"> Have Account? To Sign In Page </a>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default RegisterForm;
