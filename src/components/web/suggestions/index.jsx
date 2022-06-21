import React from 'react';
import './style.css';
import Products from '../product/Products';
function Index(props) {
  const { currentTableData } = props;

  const data = currentTableData?.filter((item, index) => (item._id ? item : null));

  return (
    <>
      <div className="related-product">
        <div className="product-related-container related-swiper-container">
          <h2 className="related-product-header">Sản phẩm tương tự</h2>
          <ul className="search-result-items tiles-container js-slv-product-grid row" data-columns>
            {data?.map((productList, index) => (
              <li key={index} className="grid-tile col-xs-3 col-sm-6 col-lg-3">
                <div className="product-tile">
                  <Products product={productList} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Index;
