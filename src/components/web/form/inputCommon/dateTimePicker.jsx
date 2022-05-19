import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

DateTimePicker.propTypes = {
  userDate: PropTypes.string,
  userMonth: PropTypes.string,
  form: PropTypes.object.isRequired,
};

function DateTimePicker(props) {
  const { form, userDate, userMonth } = props;
  const dayOptions = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '13', value: '13' },
    { label: '14', value: '14' },
    { label: '15', value: '15' },
    { label: '16', value: '16' },
    { label: '17', value: '17' },
    { label: '18', value: '18' },
    { label: '19', value: '19' },
    { label: '20', value: '20' },
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '23', value: '23' },
    { label: '24', value: '24' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '27', value: '27' },
    { label: '28', value: '28' },
    { label: '29', value: '29' },
    { label: '30', value: '30' },
    { label: '31', value: '31' },
  ];
  const monthOptions = [
    { label: '01', value: '01' },
    { label: '02', value: '02' },
    { label: '03', value: '03' },
    { label: '04', value: '04' },
    { label: '05', value: '05' },
    { label: '06', value: '06' },
    { label: '07', value: '07' },
    { label: '08', value: '08' },
    { label: '09', value: '09' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
  ];
  const [valueDate, setValueDate] = useState(userDate);
  const handleOnChangeDate = (event) => {
    setValueDate(event.target.value);
  };
  const [valueMonth, setValueMonth] = useState(userMonth);
  const handleOnChangeMonth = (event) => {
    setValueMonth(event.target.value);
  };
  return (
    <>
      <label className="form-label">Ngày sinh</label>
      <div className="selectbirthday">
        <div className="form-row  form-row-select" data-requiredtext data-regexinvalidmessage>
          <div className="form-field-wrapper">
            <div className="form-field">
              <div className="form-select-wrapper">
                <Controller
                  defaultValue
                  name="date"
                  control={form.control}
                  as={
                    <select
                      className="form-select daybirthday"
                      id="dwfrm_profile_customer_daybirthday"
                      name="dwfrm_profile_customer_daybirthday"
                      defaultValue={userDate ? userDate : null}
                      onChange={handleOnChangeDate}
                      value={valueDate}
                    >
                      <option className="hidden">Ngày</option>
                      {dayOptions.map((tc, index) => (
                        <option className="form-selectOption" key={index} value={tc.value}>
                          {tc.label}
                        </option>
                      ))}
                    </select>
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="form-row  form-row-select" data-requiredtext data-regexinvalidmessage>
          <div className="form-field-wrapper">
            <label className="visually-hidden" htmlFor="dwfrm_profile_customer_monthbirthday">
              Tháng
            </label>
            <div className="form-field">
              <div className="form-select-wrapper">
                <Controller
                  name="month"
                  control={form.control}
                  defaultValue
                  as={
                    <select
                      className="form-select monthbirthday"
                      id="dwfrm_profile_customer_monthbirthday"
                      name="dwfrm_profile_customer_monthbirthday"
                      data-dwname="monthbirthday"
                      autoComplete="bday-month"
                      aria-label="Month"
                      defaultValue={userMonth ? userMonth : null}
                      onChange={handleOnChangeMonth}
                      value={valueMonth}
                    >
                      <option className="hidden">Tháng</option>
                      {monthOptions.map((tc, index) => (
                        <option className="form-selectOption" key={index} value={tc.value}>
                          {tc.label}
                        </option>
                      ))}
                    </select>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateTimePicker;
