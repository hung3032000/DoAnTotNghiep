import Loader from 'components/fullPageLoading';
import InputCombobox from 'components/web/form/inputCommon/inputCombobox';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import './style.css';
function Index(props) {
  const { data, setData, productList } = props;
  const filterForm = useForm({
    defaultValues: {
      filter: '',
    },
  });
  const categoryOptions = [
    { label: 'Sale', value: '0' },
    { label: 'Giá từ thấp đến cao', value: '1' },
    { label: 'Giá từ cao đến thấp', value: '-1' },
  ];
  const [loading, setLoading] = useState(false);
  let sale = [];
  data.forEach((element) => {
    if (element.saleId) {
      sale.push(element);
    }
  });
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      if (values.filter === '1') {
        const numAscending = [...productList].sort((a, b) => a.price - b.price);
        setData(numAscending);
      }
      if (values.filter === '-1') {
        const numAscending = [...productList].sort((a, b) => b.price - a.price);
        setData(numAscending);
      }
      if (values.filter === '0') {
        setData(sale);
      }
    } catch (error) {
      console.log('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleOnClear = () => {
    setData(productList);
  };
  return (
    <div className="address-popin">
      {/* <h1>Lọc theo</h1> */}
      <Loader showLoader={loading} />
      <form className="form-horizontal" onSubmit={filterForm.handleSubmit(handleSubmit)}>
        <fieldset>
          <InputCombobox name="filter" form={filterForm} label="Lọc theo" dataForm={categoryOptions} />
          <div className="form-row form-row-button">
            <button type="submit" value="Apply" name="dwfrm_profile_changepassword">
              Xác nhận
            </button>
          </div>
        </fieldset>
      </form>
      <div class="filters-results-reset">
        <button class="reset-refinements btn btn-link-secondary" onClick={handleOnClear}>
          Xoá lọc
        </button>
      </div>
    </div>
  );
}

export default Index;
