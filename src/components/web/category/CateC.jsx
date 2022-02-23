import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { THUMNAIL_URL_CATEGORYCHILD } from 'constants/index';
CateC.propTypes = {
  data: PropTypes.array,
};
CateC.defaultProps = {
  data: [],
};

function CateC(props) {
  const {data} = props;

  return ( 
    <>
      {data.map((categoryCList) => (
        <div className="subcategory-container" key={categoryCList._id}>
          <Link className="merchandised-level-2" to={`/showproduct/${categoryCList._id}`}>
            <img className="img-categorychild" alt="Lỗi ảnh" src={categoryCList.icon ? categoryCList.icon : THUMNAIL_URL_CATEGORYCHILD}/>
            <div className="text">{categoryCList.namesubCategory}</div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default CateC;
