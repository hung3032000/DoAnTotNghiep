import React from 'react';

OrderDetail.propTypes = {};

function OrderDetail(props) {
  return (
    <div>
      <main id="main" className="page-content clearfix" style={{ marginTop: '128px' }}>
        <div className="cart-live-region" aria-live="polite" role="status"></div>
        <div className="container">
          <div id="primary" className="primary-content">
            <div className="orders-history">
              <div className="page-header">
                <h1>
                  <span className="subtitle">My account</span> <span className="title">Order details</span>
                </h1>
              </div>
              <div className="line-item">
                <a href="!#" id="return_to_store">
                  Go back to your order
                </a>
              </div>
              <div className="customer-table-bg">
                <p className="title-detail">Order details</p>
                <div className="table-responsive">
                  {/* <c:foreach var="item" items="${orderDetail.listResult}"></c:foreach> */}
                  <table id="order_details" className="table tableOrder" style={{ width: '100%' }}>
                    <tbody style={{ textAlign: 'center' }}>
                      <tr height="40px">
                        <th className style={{}}>
                          Product Name
                        </th>
                        <th className="align-center" style={{}}>
                          Product ID
                        </th>
                        <th className="align-center">Price</th>
                        <th className="align-center">Quantity</th>
                        <th className="total align-right">Total Price</th>
                      </tr>
                      <tr height="40px" id={0} className="odd">
                        <td className style={{ maxWidth: '300px' }}>
                          <a href="/products/hatred-wash-tee" title>
                            ${'{'}item.product.name {'}'}
                          </a>
                          <br />
                          <span className="variant_acc">
                            ${'{'}item.product.color {'}'} / ${'{'}item.product.size {'}'}
                          </span>
                        </td>
                        <td className="sku align-center">
                          ${'{'}item.product.id {'}'}
                        </td>
                        <td className="money align-center">
                          ${'{'}item.product.price{'}'}
                        </td>
                        <td className="quantity center align-center">
                          ${'{'}item.quantity {'}'}
                        </td>
                        <td className="total money align-right">
                          ${'{'}item.totalPrice {'}'}
                        </td>
                      </tr>
                      <tr height="40px" className="order_summary">
                        <td className="align-right" colSpan={4}>
                          <b>SUBTOTAL</b>
                        </td>
                        <td className="total money align-right">
                          <b>
                            ${'{'}orderModel.totalprice {'}'}$
                          </b>
                        </td>
                      </tr>
                      <tr height="40px" className="order_summary ">
                        <td className="align-right" colSpan={4}>
                          <b>DELIVERY CHARGES</b>
                        </td>
                        <td className="total money align-right">
                          <b>0$</b>
                        </td>
                      </tr>
                      <tr height="40px" className="order_summary order_total">
                        <td className="align-right" colSpan={4}>
                          <b>TOTAL</b>
                        </td>
                        <td className="total money align-right">
                          <b>
                            ${'{'}orderModel.totalprice {'}'}$
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12 content-page">
                <div className="row">
                  <div id="order_payment" className="col-md-6 col-sm-6">
                    <h3 className="order_section_title">BILLING ADDRESS</h3>
                    <div className="alert alert-info">
                      <span className="text_status">Status:</span>
                      <span className="status_pending">
                        {/* <c:if test="${ orderModel.status == 1}">pending</c:if> <c:if test="${ orderModel.status == 0}">confirmed</c:if>
                        <c:if test="${ orderModel.status == -1}">canceled</c:if> */}
                      </span>
                    </div>
                    <div className="address">
                      <p className="adressName ">
                        ${'{'}orderModel.customer.title{'}'}${'{'}orderModel.customer.lName{'}'}
                      </p>
                      <p />
                      <p>
                        ${'{'}orderModel.customer.address{'}'}
                      </p>
                      <p />
                      <p>
                        ${'{'}orderModel.customer.phone{'}'}
                      </p>
                    </div>
                  </div>
                  <div id="order_shipping" className="col-md-6 col-sm-6">
                    <h3 className="order_section_title">DELIVERY ADDRESS</h3>
                    <div className="alert alert-info">
                      <span className="text_status">Status:</span>
                      <span className="status_not fulfilled">
                        {/* <c:if test="${ orderModel.status == 1}">not fulfilled</c:if> <c:if test="${ orderModel.status == 0}">fulfilled</c:if>
                        <c:if test="${ orderModel.status == -1}">canceled</c:if> */}
                      </span>
                    </div>
                    <div className="address">
                      <p className="adressName ">
                        ${'{'}orderModel.customer.title{'}'}${'{'}orderModel.customer.lName{'}'}
                      </p>
                      <p />
                      <p>
                        ${'{'}orderModel.customer.address{'}'}
                      </p>
                      <p />
                      <p>
                        ${'{'}orderModel.customer.phone{'}'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="customer-support">
          <div className="content-asset">
            <div className="title">Cần giúp hôm?</div>
            <div className="container">
              <div className="text">
                <p className="subtitle">Client Services</p>
                Phục vụ từ 10h sáng đến 3h đêm nha mấy cưng
              </div>
              <div className="links">
                <a href="!#" className="contact-popin">
                  <i className="icon_Email" />
                  Email
                </a>
                <a href="tel:0929363511" className="call-to-button">
                  <i className="icon_Call" />
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default OrderDetail;
