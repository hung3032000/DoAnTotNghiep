import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Products from './Products';
ProductsList.propTypes = {
  data: PropTypes.array,
};

ProductsList.defaultProps = {
  data: [],
};
function ProductsList({ data }) {
  const [hovered, setHovered] = useState(-1);
  return (
    <div>
      {data.map((productList, index) => (
        <li key={productList._id} className={`grid-tile col-xs-3 col-sm-6 col-lg-3 ${index === 6 ? 'col-mg-reset-7' : ''} ${index === 7 ? ' col-mg-reset-7 col-mg-reset-8' : ''}`}>
          <div className={`product-tile ${hovered === productList._id ? 'hover' : ''}`} onMouseEnter={() => setHovered(productList._id)} onMouseLeave={() => setHovered(-1)}>
            <Products product={productList} />
          </div>
        </li>
      ))}
    </div>
  );
}

export default ProductsList;
