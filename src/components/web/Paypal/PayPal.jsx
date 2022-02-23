import orderApi from 'api/orderApi';
import { cartTotalSelector } from 'components/web/cart/Selectors';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { emptyCart } from '../cart/CartSlice';
export default function Paypal() {
  const cartTotal = useSelector(cartTotalSelector);
  console.log(cartTotal.toFixed(2))
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
          console.log(dataCart);
          let item = {
            unit_amount: {
              currency_code: 'USD',
              value: 0.01,
            },
            quantity: 2,
            name: 'Item 1',
          };
          let items1 = [];
          for (var i = 0; i < dataCart.length; i++) {
            item.unit_amount.value = (dataCart[i].product.price / 20000).toFixed(2);
            item.quantity = dataCart[i].quantity;
            item.name = dataCart[i].product.name;
            item.totalPrice = dataCart[i].quantity * dataCart[i].product.price;

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
                  value: (cartTotal / 20000).toFixed(2),
                  currency_code: 'USD',
                  breakdown: {
                    item_total: {
                      currency_code: 'USD',
                      value: (cartTotal / 20000).toFixed(2),
                    },
                  },
                },
                items: items1,
              },
            ],
          });
        },

        onApprove: async (data, actions) => {
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
          };
          let items = [];
          for (let i = 0; i < dataCart.length; i++) {
            item.productId = dataCart[i].product._id;
            item.quantity = dataCart[i].quantity;
            item.totalPrice = (dataCart[i].quantity * dataCart[i].product.price).toFixed(2);
            items.unshift(item);
            item = {
              productId: 1,
              quantity: 2,
              totalPrice: 200,
            };
          }
          order.userId = userId;
          order.items = items;
          order.totalPrice = cartTotal.toFixed(2);
          order.paymentId = order.id;
          order.isPaypal = true;
          //xem lai api
          orderApi.add(order);
          const action = emptyCart();
          dispatch(action);
          history.push('/order');
          window.location.reload();
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [cartTotal, dataCart, dispatch, history, userId]);

  return (
    <div>
      <main id="main">
        <div class="centered paypal-button-container" ref={paypal}></div>
      </main>
    </div>
  );
}
