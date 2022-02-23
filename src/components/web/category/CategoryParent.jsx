import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Subcategory from './SubCategory';

CategoryParent.propTypes = {
  data: PropTypes.array,
};
CategoryParent.defaultProps = {
  data: [],
};

function CategoryParent({ data }) {
  const [hovered, setHovered] = useState(-1);
  const [current, setCurrent] = useState(-1);
  return (
    <div>
      {data.map((category) => (
        <li
          key={category._id}
          className={`level-1 ${hovered === category._id ? 'hover' : ''} ${current === category._id ? 'current' : ''}`}
          id={category._id}
          onMouseEnter={() => setHovered(category._id)}
          onMouseLeave={() => setHovered(-1)}
          onClick={() => setCurrent(category._id)}
        >
          <Link to={`/categorychild/${category._id}`} className="level-1 navigation-hasSubMenu">
            <span>{category.nameCategory}</span>
          </Link>
          <Subcategory />
        </li>
      ))}
      {/* current */}
    </div>
  );
}

export default CategoryParent;
