import React from 'react';
import PropTypes from 'prop-types';
import QuantityField from 'components/web/form/QuantityField/index';
import { useForm } from 'react-hook-form';

AddToCart.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCart({ onSubmit = null }) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)} >
        <div style={{ display: 'none' }}>
          <QuantityField name="quantity" label="Quantity" form={form} value={1} />
        </div>
        <button type="submit" title="Add to cart" value="Add to cart" className="form-button button--full add-to-cart disabled">
          Add to cart
        </button>
      </form>
    </div>
  );
}

export default AddToCart;
