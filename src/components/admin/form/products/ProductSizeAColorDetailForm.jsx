import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextFieldCusDis from 'components/admin/form/common/TextFieldDisable/index';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getSizeProduct } from 'slice/SizeAColor';
import Loader from 'components/fullPageLoading';
import { Button, Dialog, DialogContent} from '@material-ui/core';
import { Link } from 'react-router-dom';
import TableRow from 'components/admin/dynamicForm/index';

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
              id: dataSize._id,
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg" fullWidth={true}>
        <DialogContent>
          <div className="rule-engine-content">
            <h5 className="content-title">Size và Màu<Link to={`/sizeA/newSize/${product}`} style={{float: 'right',padding: 0}}>Thêm mới</Link></h5>
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
                  <TableRow key={index} inputList={i} setInputList={setInputList} readOnly={true}/>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ProductSizeAColorDetailForm;
