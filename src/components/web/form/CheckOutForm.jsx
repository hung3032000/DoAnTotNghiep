import React from 'react';
import CheckOutAddress from './inputFieldCheckOut/CheckOutAddress';
import CheckOutEmail from './inputFieldCheckOut/CheckOutEmail';
import CheckOutFName from './inputFieldCheckOut/CheckOutFName';
import CheckOutLName from './inputFieldCheckOut/CheckOutLName';
import CheckOutPhone from './inputFieldCheckOut/CheckOutPhone';
import CheckOutTiltle from './inputFieldCheckOut/CheckOutTiltle';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
CheckOutForm.propTypes = {
  onSubmit: PropTypes.func,
};

function CheckOutForm(props) {
  const dataUser = useSelector((state) => state.user.current);
  const checkOutForm = useForm({
    defaultValues: {
      LName: '',
      FName: '',
      Address: '',
      Title: '',
      Phone: '',
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

      <form
        onSubmit={checkOutForm.handleSubmit(handleSubmit)}
        className="shipping-address-select-form"
      >
        <div className="checkout-box shipping-address-box">
          <h3 className="info-perso">Personal information</h3>
          <CheckOutEmail name="email" userEmail={dataUser}/>
          <h3>Delivery Address</h3>
          <CheckOutTiltle name="Title" formCheckOutTitle={checkOutForm}/>
          <CheckOutLName name="LName" formCheckOutLName={checkOutForm}/>
          <CheckOutFName name="FName" formCheckOutFName={checkOutForm}/>
          <CheckOutAddress name="Address" formCheckOutAddress={checkOutForm}/>
          <CheckOutPhone name="Phone" formCheckOutPhone={checkOutForm}/>
          <div className="billing-address">
            <button className="form-button shipping-address-save" name="dwfrm_singleshipping_shippingAddress_save">
              Check Out
            </button>
            <a className="checkout-back-to-cart" href="/usercart">
              Return to your cart
            </a>
          </div>
        </div>
      </form>

  );
}

export default CheckOutForm;
