import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import TableRow from 'components/admin/dynamicForm/index';
import Loader from 'components/fullPageLoading';
import 'components/admin/dynamicForm/style.css';
import { useRouteMatch } from 'react-router';
import adminAPI from 'api/adminAPI';

function ProductNewSize() {
  const {
    params: { id },
  } = useRouteMatch();
  const [inputList, setInputList] = useState([{ index: Math.random(), colorName: '', quantity: 1 }]);
  const [loading, setLoading] = useState(false);

  // handle submit form
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      let color, quantity;
      let temp = [];
      let data = {};
      data.nameSize = inputList[0].nameSize;
      data.productId = id;
      for (let index = 0; index < inputList.length; index++) {
        color = inputList[index].color + '';
        quantity = parseInt(inputList[index].quantity);
        temp.push({ colorName: color, quantity: quantity });
      }
      data.colors = temp;

      setLoading(true);
      adminAPI
        .addSizeAColor(data)
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
    setInputList([...inputList, { index: Math.random(), colorName: '', quantity: 1 }]);
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
            Lưu
          </Button>
        </div>
      </form>
    </>
  );
}

export default ProductNewSize;
