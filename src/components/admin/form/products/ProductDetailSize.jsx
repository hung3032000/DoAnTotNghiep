import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import TableRow from 'components/admin/dynamicForm/index';
import { getSizeById } from 'slice/SizeAColor';
import 'components/admin/dynamicForm/style.css';
import { Button } from '@material-ui/core';
import Loader from 'components/fullPageLoading';
import { useRouteMatch } from 'react-router';
import adminAPI from 'api/adminAPI';

function ProductDetailSize() {
  const {
    params: { id },
  } = useRouteMatch();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [inputList, setInputList] = useState([{ index: Math.random() }]);

  const dataSize = useSelector((state) => state.sizeAcolor.sizeA);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const actionChild = getSizeById(id);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, id]);

  useEffect(() => {
    if (dataSize <= 0) {
      setInputList([{ index: Math.random() }]);
    } else {
      let item;
      let list = [];
      for (let index = 0; index < dataSize.colors.length; index++) {
        item = {
          index: Math.random(),
          productId: dataSize.productId,
          nameSize: dataSize.nameSize,
          color: dataSize.colors[index].colorName,
          quantity: dataSize.colors[index].quantity,
        };
        list.push(item);
      }
      setInputList(list);
    }
  }, [dataSize]);

  // handle submit form
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      let color, quantity;
      let temp = [];
      let data = {};
      data.nameSize = inputList[0].nameSize ? inputList[0].nameSize : dataSize.nameSize;
      data.productId = dataSize.productId;
      for (let index = 0; index < inputList.length; index++) {
        color = inputList[index].color + '';
        quantity = parseInt(inputList[index].quantity);
        temp.push({ colorName: color, quantity: quantity });
      }
      data.colors = temp;

      setLoading(true);
      adminAPI
        .updateSizeAColor(id, data)
        .then((res) => {
          window.localtion.reload();
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.data.message);
          }
        })
        .finally(() => {
          window.location.reload();
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      {
        index: Math.random(),
      },
    ]);
  };
  return (
    <>
      <Loader showLoader={loading} />

      <form onSubmit={handleSubmit2}>
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
              <TableRow inputList={inputList} setInputList={setInputList} />
            </tbody>
          </table>
        </div>
        <Button type="button" className="rule-engine-btn btn-ellipsis" onClick={() => handleAddClick()}>
          +
        </Button>
        <div className="rule-engine-action">
          <Button type="submit" className="rule-engine-btn btn-save">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}

export default ProductDetailSize;
