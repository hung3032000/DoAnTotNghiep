import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Subcategory from './SubCategory';

CategoryParent.propTypes = {
  data: PropTypes.array,
};
CategoryParent.defaultProps = {
  data: [],
};

function CategoryParent({ data }) {
  const [hovered, setHovered] = useState(-1);
  return (
    <>
      {data.map((category) => (
        <li
          key={category._id}
          className={`level-1 ${hovered === category._id ? 'hover' : ''}`}
          id={category._id}
          onMouseEnter={() => setHovered(category._id)}
          onMouseLeave={() => setHovered(-1)}
        >
          <NavLink activeClassName="current" to={`/categorychild/${category._id}`} className="level-1 navigation-hasSubMenu">
            <span>{category.nameCategory}</span>
          </NavLink>
          <Subcategory />
        </li>
      ))}
    </>
  );
}

export default CategoryParent;
