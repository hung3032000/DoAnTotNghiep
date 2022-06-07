/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputCombobox from './inputCommon/inputCombobox';
import Input from './inputCommon/inputText';
import useLocationForm from './address/useLocationForm';

import axios from 'axios';
import { PATHS } from 'constants/paths';

const FETCH_TYPES = {
  CITIES: 'FETCH_CITIES',
  DISTRICTS: 'FETCH_DISTRICTS',
  WARDS: 'FETCH_WARDS',
};
async function fetchLocationOptions(fetchType, locationId) {
  let url;
  switch (fetchType) {
    case FETCH_TYPES.CITIES: {
      url = PATHS.CITIES;
      break;
    }
    case FETCH_TYPES.DISTRICTS: {
      url = `${PATHS.DISTRICTS}/${locationId}.json`;
      break;
    }
    case FETCH_TYPES.WARDS: {
      url = `${PATHS.WARDS}/${locationId}.json`;
      break;
    }
    default: {
      return [];
    }
  }
  const locations = (await axios.get(url)).data['data'];
  return locations.map(({ id, name }) => ({ value: id, label: name }));
}
function UpdateAddress(props) {
  const { data } = props;
  const { state, onCitySelect, onDistrictSelect, onWardSelect } = useLocationForm(false);
  let { cityOptions, districtOptions, wardOptions, selectedCity, selectedDistrict, selectedWard } = state;
  const [state2, setState2] = useState({
    cityOptions: [],
    districtOptions: [],
    wardOptions: [],
    selectedCity: null,
    selectedDistrict: null,
    selectedWard: null,
  });
  const addressform = useForm({
    defaultValues: {
      _id: data._id,
      city: data.city,
      district: data.district,
      ward: data.ward,
      nameCustomer: data.nameCustomer,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      gender: data.gender,
    },
  });

  useEffect(() => {
    state.selectedCity = data.city;
    state.selectedDistrict = data.district;
    state.selectedWard = data.ward;
  }, []);

  useEffect(() => {
    (async function () {
      if (!data.city) return;
      const options = await fetchLocationOptions(FETCH_TYPES.DISTRICTS, data.city.value);
      setState2({ ...state, districtOptions: options });
    })();
  }, []);
  state.districtOptions = state2.districtOptions;

  const handleSubmit = async (values) => {
    values.city = state.selectedCity;
    values.district = state.selectedDistrict;
    values.ward = state.selectedWard;
    values._id = data._id;
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const handleOnChangeCity = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;
    onCitySelect({ value: value, label: label });
  };
  const handleOnChangeDistrict = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;

    onDistrictSelect({ value: value, label: label });
  };
  const handleOnChangeWard = (e) => {
    let index = e.target.selectedIndex;
    let label = e.target[index].text;
    let value = e.target.value;

    onWardSelect({ value: value, label: label });
  };

  return (
    <form className="form-horizontal" onSubmit={addressform.handleSubmit(handleSubmit)}>
      <fieldset>
        <InputCombobox name="gender" form={addressform} />
        <Input name="nameCustomer" form={addressform} placeholder="Họ và Tên *" />
        <Input name="phoneNumber" form={addressform} placeholder="Số điện thoại *" />
        <div className={`form-row  required form-row-select`}>
          <div className="form-field-wrapper">
            <label className="form-label">Tỉnh/Thành phố</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select  form-field required"
                  name="cityId"
                  key={`cityId_${selectedCity?.value}`}
                  onChange={handleOnChangeCity}
                  placeholder="Tỉnh/Thành"
                  value={selectedCity?.value}
                  defaultValue={selectedCity}
                >
                  <option className="hidden">Tỉnh/Thành</option>
                  {cityOptions.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={`form-row  required form-row-select`}>
          <div className="form-field-wrapper">
            <label className="form-label">Quận/Huyện</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select  form-field required"
                  name="districtId"
                  key={`districtId${selectedDistrict?.value}`}
                  onChange={handleOnChangeDistrict}
                  disabled={districtOptions.length === 0}
                  placeholder="Quận"
                  value={selectedDistrict?.value}
                  defaultValue={selectedDistrict}
                >
                  <option className="hidden">Quận/Huyện</option>
                  {districtOptions.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className={`form-row  required form-row-select`}>
          <div className="form-field-wrapper">
            <label className="form-label">Phường/Xã</label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <select
                  className="form-select  form-field required"
                  name="wardId"
                  key={`wardId${selectedWard?.value}`}
                  onChange={handleOnChangeWard}
                  placeholder="Huyện"
                  disabled={wardOptions.length === 0}
                  value={selectedWard?.value}
                  defaultValue={selectedWard}
                >
                  <option className="hidden">Phường/Xã</option>
                  {wardOptions.map((tc, index) => (
                    <option className="form-selectOption" key={index} value={tc.value}>
                      {tc.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <Input name="detailAddress" form={addressform} placeholder="Địa chỉ *" />

        <p className="mandatory-fields">Tất cả các trường có dấu * là bắt buộc</p>
        <div className="form-row form-row-button">
          <button className="apply-button btn btn-outline-primary btn-full " type="submit" name="dwfrm_profile_address_edit" value="Apply">
            Apply
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default UpdateAddress;
