import React from 'react';
function index(props) {
  const { product, color } = props;

  const filterColor = () => {
    let colorTemp = [];
    let finalColor = [];
    color.forEach((i) => {
      i.colors.forEach((i2) => {
        colorTemp.push(i2.colorName);
      });
    });
    colorTemp = colorTemp.filter((item, index) => colorTemp.indexOf(item) === index);
    for (let index = 0; index < colorTemp.length; index++) {
      finalColor.push({ _id: index, colorName: colorTemp[index] });
    }
    return finalColor;
  };
  return (
    <div className="container-description">
      <div className="short-description">
        <ul>
          <li>{product.description}.</li>

        </ul>
      </div>

      <button className="btn btn-link-secondary button-text size-guide size-guide-panel-btn" type="button">
        Bảng hướng dẫn size
      </button>
      <dl className="table-brand">
        <div className="product-dl-item">
          <dt>Màu</dt>

          <dd className="color-value">
            {filterColor().map((i, index) => (
              <>
                {i.colorName}
                {index === filterColor().length - 1 ? '' : '/'}
              </>
            ))}
          </dd>
        </div>
        <div className="product-dl-item">
          <dt>Chất liệu</dt>
          <dd>
            <p>{product.material}.</p>
          </dd>
        </div>
        <div className="product-dl-item">
          <dt>Cách bảo quản</dt>
          <dd>
            <ul>
              <li>Nên giặc khô.</li>
              <li>Không sử dụng chất tẩy.</li>
              <li>Nước giặc không nóng quá 80%.</li>
              <li>Ủi ở nhiệt độ mặt đế tối đa (110 ° C) nếu không có hơi nước.</li>
              <li>Không sấy khô.</li>
            </ul>
          </dd>
        </div>
        <div className="product-dl-item">
          <dt>Nguồn gốc</dt>
          <dd>{product.orgin}</dd>
        </div>
        <div className="product-dl-item sku">
          <dt>Mã sản phẩm</dt>
          <dd className="pid">{product._id}</dd>
        </div>
      </dl>

      <div className="text">
        <h2>Hỗ trợ khách hàng</h2>
        <p>Đội ngũ hỗ trợ sẵn sàng từ thứ 2 đến thứ 7 từ 10:00 sáng đến 7:00 tối để trả lời tất cả các thắc mắc của khách hàng.</p>
      </div>
      <div className="links">
        <a className="mail-to-button" href="mailto:contact@homie.com">
          Email
        </a>
      </div>
    </div>
  );
}

export default index;
