import React, { useState } from 'react';
import './style.css';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// import { Controller } from 'react-hook-form';
Index.propTypes = {
  vouchers: PropTypes.array.isRequired,
};

function Index(props) {
  const [voucherChoose, setVoucherChoose] = useState();
  const voucherForm = useForm();
  // const search = useForm({
  //   defaultValues: {
  //     search: '',
  //   },
  // });
  const handleSubmit = async () => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(voucherChoose);
    }
  };
  // const handleSubmitSearch = async (data) => {
  //   const { onSubmitSearch } = props;
  //   if (onSubmitSearch) {
  //     await onSubmitSearch(data);
  //   }
  // };
  const { vouchers } = props;
  return (
    <>
      {/* <form className="form-horizontal edit-account-form" id="RegistrationForm" onSubmit={search.handleSubmit(handleSubmitSearch)}>
        <div className="form-row-search placeholder">
          <div className="form-field-wrapper">
            <div className="form-field">
              <Controller name="search" id="search" control={search.control} as={<input />} className="form-input topSearch-field" type="text" placeholder="Nhập mã giảm giá" />
            </div>
          </div>
          <button className="btn btn-link" type="submit" disabled="disabled">
            Áp dụng
          </button>
        </div>
      </form> */}
      {vouchers.map((voucher) => (
        <div className="field-wrapper" key={voucher._id}>
          <form onSubmit={voucherForm.handleSubmit(handleSubmit)}>
            <div className="voucher-element not-instore voucher-selected">
              <p>Mã giảm giá: {voucher.nameVouncher}</p>
              <p>Mô tả: {voucher.description}</p>
              <p>Giảm giá: {voucher.discountPercent}%</p>
              <p>Giảm tối đa: {voucher.priceOrderLimit}đ</p>
              <p>
                HSD: {voucher.dateEnd.day}/{voucher.dateEnd.month}/{voucher.dateEnd.year}
              </p>
              <button
                className="edit-voucherdelivery"
                onClick={() => {
                  setVoucherChoose(voucher);
                }}
              >
                Áp dụng
              </button>
            </div>
          </form>
        </div>
      ))}
    </>
  );
}

export default Index;
