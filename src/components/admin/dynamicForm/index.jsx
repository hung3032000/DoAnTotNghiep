import React from 'react';
import { Button } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from 'react-router-dom';
import { deleteSizeAColor } from 'slice/SizeAColor';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
function Index(props) {
  let { inputList, setInputList, readOnly } = props;
  const dispatch = useDispatch();

  const categoryOptions = [
    { label: 'XXS', value: 'XXS', _id: 0 },
    { label: 'XS', value: 'XS', _id: 1 },
    { label: 'S', value: 'S', _id: 2 },
    { label: 'M', value: 'M', _id: 3 },
    { label: 'L', value: 'L', _id: 4 },
    { label: 'XL', value: 'XL', _id: 5 },
    { label: 'XXL', value: 'XXL', _id: 6 },
  ];

  // handle input change
  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    document.getElementById(`color${index}`).setAttribute('type', 'text');
    document.getElementById(`quantity${index}`).setAttribute('type', 'number');
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (record) => {
    setInputList([...inputList.filter((r) => r !== record)]);
  };

  const handleOnDelete = async (id) => {
    try {
      const action = deleteSizeAColor(id);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      window.location.reload();
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return inputList.map((inputValue, index) => {
    return (
      <tr key={inputValue.index} style={{ position: 'relative' }}>
        <td className="table__td">
          {index === 0 ? (
            <div className="td-flex">
              <div className="select-container">
                <select disabled={readOnly ? true : false} className="select" name="nameSize" value={inputValue.nameSize} onChange={(e) => handleInputChange(e, index)}>
                  {categoryOptions.map((item, idx) => {
                    return (
                      <option key={idx} className="option-select" value={item.value}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          ) : (
            ''
          )}
        </td>

        <td className="table__td">
          <div className="select-container">
            <input
              type="text"
              disabled={readOnly ? true : false}
              className="select"
              name="color"
              id={`color${index}`}
              value={inputValue.color}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        </td>
        <td className="table__td">
          <div className="select-container">
            <input
              type="number"
              disabled={readOnly ? true : false}
              className="select"
              name="quantity"
              id={`quantity${index}`}
              min="1"
              value={inputValue.quantity}
              onChange={(e) => handleInputChange(e, index)}
            />
          </div>
        </td>

        <td
          style={{
            display: readOnly ? 'none' : 'block',
            position: 'absolute',
            top: '50%',
            right: '-5%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
          }}
        >
          {index === 0 || readOnly === true ? (
            ''
          ) : (
            <Button type="button" className="rule-engine-btn btn-ellipsis" onClick={() => handleRemoveClick(inputValue)}>
              <RemoveIcon />
            </Button>
          )}
        </td>
        <td
          className="table__td"
          style={{
            display: readOnly ? 'block' : 'none',
          }}
        >
          {index === 0 ? (
            <div className="td-flex">
              <div className="select-container">
                <Link style={{ width: '4rem' }} to={`/sizeA/${inputValue.id}`} color="primary">
                  Sửa
                </Link>
                <a
                  style={{ float: 'right', cursor: 'pointer' }}
                  href
                  color="primary"
                  onClick={() => {
                    handleOnDelete(inputValue.id);
                  }}
                >
                  Xoá
                </a>
              </div>
            </div>
          ) : (
            ''
          )}
        </td>
      </tr>
    );
  });
}

export default Index;
