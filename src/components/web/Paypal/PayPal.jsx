import { cartTotalSelector } from 'slice/Selectors';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { emptyCart } from '../../../slice/CartSlice';
import { addOrderUser } from 'slice/OrderSlice';
import { unwrapResult } from '@reduxjs/toolkit';

import { Helmet } from 'react-helmet';
let total = 0;
export default function Paypal() {
  const cartTotal = useSelector(cartTotalSelector);
  const dataCart = useSelector((state) => state.cart.dataCart);
  const userId = useSelector((state) => state.user.current._id);
  const paypal = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    window.paypal
      .Buttons({
        style: {
          layout: 'vertical',
          color: 'silver',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data, actions, err) => {
          let item = {
            unit_amount: {
              currency_code: 'USD',
              value: 0.01,
            },
            quantity: 2,
            name: 'Item 1',
          };
          let items1 = [];
          let a = 0;
          let b = 0;
          for (var i = 0; i < dataCart.length; i++) {
            if (dataCart[i].product.saleId) {
              a = ((dataCart[i].product.price - (dataCart[i].product.price * dataCart[i].product.saleId.percentSale) / 100) / 20000).toFixed(2);
              b = dataCart[i].quantity * ((dataCart[i].product.price - (dataCart[i].product.price * dataCart[i].product.saleId.percentSale) / 100) / 20000).toFixed(2);
            } else {
              a = (dataCart[i].product.price / 20000).toFixed(2);
              b = dataCart[i].quantity * (dataCart[i].product.price / 20000).toFixed(2);
            }
            total += b;
            item.unit_amount.value = a;
            item.totalPrice = b;
            item.quantity = dataCart[i].quantity;
            item.name = dataCart[i].product.name;
            items1.unshift(item);
            item = {
              unit_amount: {
                currency_code: 'USD',
                value: 0.01,
              },
              quantity: 2,
              name: 'Item 1',
            };
          }
          return actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
              {
                description: 'Stuff',
                amount: {
                  value: total.toFixed(2),
                  currency_code: 'USD',
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: total.toFixed(2),
                    },
                  },
                },
                items: items1,
              },
            ],
          });
        },

        onApprove: async (data, actions) => {
          try {
            const order = await actions.order.capture();
            order.addressrecevie = {
              name: order.payer.email_address,
              phonenumber: '0929333111',
              address: order.payer.address.country_code,
            };
            let item = {
              productId: 1,
              quantity: 2,
              totalPrice: 200,
              colorName: 'Black',
              saleId: 26,
              sizeId: 1,
              sizeName: 'S',
            };
            let items = [];
            let b = 0;
            for (let i = 0; i < dataCart.length; i++) {
              item.productId = dataCart[i].product._id;
              item.colorName = dataCart[i].color;
              item.sizeName = dataCart[i].size;
              item.quantity = dataCart[i].quantity;
              item.sizeId = dataCart[i].sizeId;
              if (dataCart[i].product.saleId) {
                b = dataCart[i].quantity * ((dataCart[i].product.price - (dataCart[i].product.price * dataCart[i].product.saleId.percentSale) / 100) / 20000);
                item.saleId = dataCart[i].product.saleId._id;
              } else {
                b = dataCart[i].quantity * (dataCart[i].product.price / 20000);
                item.saleId = null;
              }
              item.totalPrice = b.toFixed(2);
              items.unshift(item);
              item = {
                productId: 1,
                quantity: 2,
                totalPrice: 200,
                colorName: 'Black',
                saleId: 26,
                sizeName: 'S',
              };
            }
            order.priceDiscount = 0;
            order.userId = userId;
            order.items = items;
            order.totalPrice = cartTotal;
            order.paymentId = order.id;
            order.isPaypal = true;
            console.log(order);
            const action = addOrderUser(order);
            const resultAction = await dispatch(action);
            unwrapResult(resultAction);

            const actionEmptyCart = emptyCart();
            dispatch(actionEmptyCart);
            history.push('/order');
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [cartTotal, dataCart, dispatch, history, userId]);

  return (
    <>
      <Helmet>
        <title>Thanh toán paypal</title>
      </Helmet>
      <main id="main">
        <div className="centered paypal-button-container" ref={paypal}></div>
      </main>
    </>
  );
}
