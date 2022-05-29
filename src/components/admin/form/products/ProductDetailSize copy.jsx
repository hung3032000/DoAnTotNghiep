import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextFieldCusDis from 'components/admin/form/common/TextFieldDisable/index';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getSizeProduct } from 'slice/SizeAColor';
import TableRow from 'components/admin/dynamicForm/index';
import Loader from 'components/fullPageLoading';
import { getSizeById } from 'slice/SizeAColor';
import '../../dynamicForm/style.css';

ProductSizeAColorDetailForm.propTypes = {
  widthCustome: PropTypes.number,
  product: PropTypes.any,
};

function ProductSizeAColorDetailForm(props) {
  const [inputList, setInputList] = useState(props);

  return (
    <>
      <div className="rule-engine-content">
        <h5 className="content-title">Size và Màu</h5>
        <table className="table">
          <thead className="table-head">
            <tr>
              <th className="table__th">Size</th>
              <th className="table__th">Màu</th>
              <th className="table__th">Số lượng</th>
              <th className="table__th"></th>
            </tr>
          </thead>
          <tbody>
            {inputList.map((i, index) => (
              <TableRow key={index} inputList={i} setInputList={setInputList} readOnly={true} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ProductSizeAColorDetailForm;
