import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
// import * as yup from 'yup';
// import UserAddress from './inputFieldUpdateInfo/UserAddress';
import UserBirthday from './inputFieldUpdateInfo/UserBirthday';
import UserEmail from './inputFieldUpdateInfo/UserEmail';
import UserFName from './inputFieldUpdateInfo/UserFName';
import UserLName from './inputFieldUpdateInfo/UserLName';
import UserPhone from './inputFieldUpdateInfo/UserPhone';
import UserTiltle from './inputFieldUpdateInfo/UserTiltle';
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
      date: dataUser.date,
      month: dataUser.month,
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
      <form className="form-horizontal edit-account-form" id="RegistrationForm" onSubmit={updateForm.handleSubmit(handleSubmit)}>
        <p className="required-msg">All fields marked with an * are mandatory</p>
        <div className="error-form global-error form-row" aria-live="polite" />
        <fieldset>
          <legend className="visually-hidden">Personal information</legend>
          <UserTiltle userTiltle={dataUser.gender} name="gender" formUserTitle={updateForm} />
          <UserFName userFName={dataUser.fistname} name="fistname" formUserFName={updateForm} />
          <UserLName userLName={dataUser.lastname} name="lastname" formUserLName={updateForm} />
          {/* <UserAddress userAddress={dataUser.addresses[0].city} name="address" formUserAddress={updateForm} /> */}
          <UserBirthday userDate={dataUser.date} userMonth={dataUser.month} date="date" month="month" formUserBirthday={updateForm} />
          <UserEmail name="email" userEmail={dataUser} formUserEmail={updateForm}/>
          <UserPhone userPhone={dataUser.phonenumber} name="phonenumber" formUserPhone={updateForm} />
          <div className="form-row form-row-button">
            <button type="submit" value="Apply" name="dwfrm_profile_confirm">
              Save changes
            </button>
          </div>
          <div className="form-row form-row-button">
            <button type="button" className="delete-account" value="Delete account" name="dwfrm_profile_deleteaccount">
              Delete account
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default UpdateInfoForm;
