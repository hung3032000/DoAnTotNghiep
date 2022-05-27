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
  const dataSizeList = useSelector((state) => state.sizeAcolor.size);

  const { product, widthCustome } = props;
  const dispatch = useDispatch();
  const [totalProductState, setTotalProductState] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const actionChild = getSizeProduct(product);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, product]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setTotalProductState(0);
        let totalProduct = 0;
        for (let size of dataSizeList) {
          setLoading(true);
          let colors = size.colors;
          let totalQuantity = 0;
          for (let color of colors) {
            totalQuantity += color.quantity;
          }
          totalProduct += totalQuantity;
          setTotalProductState(totalProduct);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dataSizeList, dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [open, setOpen] = useState(false);

  const dataSize = useSelector((state) => state.sizeAcolor.sizeA);
  const [inputList, setInputList] = useState([]);
  const [readOnly, setReadOnly] = useState(true);
  console.log(readOnly);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const actionChild = getSizeById(14);
        const resultActionChild = dispatch(actionChild);
        unwrapResult(resultActionChild);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    try {
      setLoading(true);

      let data = [];
      for (let dataSize of dataSizeList) {
        if (dataSize <= 0) {
          data = [{ index: Math.random() }];
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
          data.push(list);
        }
      }
      setInputList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dataSize, dataSizeList]);

  // handle submit form
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    try {
      let color, quantity;
      let temp = [];
      let data = {};
      data.nameSize = inputList[0].size ? inputList[0].size : dataSize.nameSize;
      data.productId = product._id;
      for (let index = 0; index < inputList.length; index++) {
        color = inputList[index].color + '';
        quantity = parseInt(inputList[index].quantity);
        temp.push({ colorName: color, quantity: quantity });
      }
      data.colors = temp;
      console.log(data);
      // setLoading(true);
      // adminAPI
      //   .updateSizeAColor(14, data)
      //   .then((res) => {
      //     window.localtion.reload();
      //   })
      //   .catch((err) => {
      //     if (err.response) {
      //       console.log(err.response.data.message);
      //     }
      //   })
      //   .finally(() => {
      //     window.location.reload();
      //     setLoading(false);
      //   });
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
      <TextFieldCusDis
        widthCustome={widthCustome}
        label="Tổng Số lượng"
        name="quantity"
        edit={totalProductState ? totalProductState : 0}
        InputProps={{
          endAdornment: (
            <Button color="primary" aria-label="edit" type="submit" onClick={handleClickOpen}>
              Xem chi tiết
            </Button>
          ),
        }}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth>
        <DialogTitle id="form-dialog-title">Thông tin size và màu</DialogTitle>
        <DialogContent>
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
                  {inputList.map((i, index) => (
                
                      <TableRow key={index} inputList={i} setInputList={setInputList} readOnly={readOnly} setReadOnly={setReadOnly} />
                 
                  ))}
                </tbody>
              </table>
            </div>
            {readOnly === true ? (
              ''
            ) : (
              <>
                <div className="rule-engine-action">
                  <Button type="submit" className="rule-engine-btn btn-save">
                    Save
                  </Button>
                  <Button type="button" className="rule-engine-btn btn-cancel" onClick={handleClose}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductSizeAColorDetailForm;
