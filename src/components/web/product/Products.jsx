import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { THUMNAIL_URL_PRODUCTLIST } from 'constants/index';
import { formatPrice } from 'utils/common';
Products.propTypes = {
  product: PropTypes.object,
};

Products.defaultProps = {
  product: [],
};
function Products({ product }) {
  const thumnailUrl =
   product.images ? product.images :
   THUMNAIL_URL_PRODUCTLIST;
  return (
      <figure className="product-image">
        <Link className="thumb-link" to={`/productinf/${product._id}`}>
          <picture className="thumb-img">
            <img className="img-product" src={thumnailUrl} alt="Lỗi ảnh" />
          </picture>
          <span className="flag">{product.content}</span>
          <figcaption className="thumb-caption">
            <div className="product-infos">
              <div className="product-name">{product.name}</div>
              <div className="product-pricing">
                <div className="product-price" itemProp="offers" itemScope itemType="/#">
                  <span className="price-sales">{formatPrice(product.price)}</span>
                </div>
              </div>
              <div className="product-promo" />
            </div>
          </figcaption>
        </Link>
        <a href="/#" data-pname="Coat in wool and cashmere with 4G buttons and chain" data-pid="BWC08N13FP-001" className="add-to-wishlist">
          <i className="icon_Wishlist" /> <i className="icon_Wishlist_Active" />
          <span className="visually-hidden">Add to your wishlist Coat in wool and cashmere with 4G buttons and chain</span>
        </a>
      </figure>
  );
}

export default Products;
