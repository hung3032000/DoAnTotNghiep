import React from 'react';
// import { Controller } from 'react-hook-form';

import { useSelector } from 'react-redux';
import Autocomplete from 'components/autoComplete';

function Search() {

  const dataProductList = useSelector((state) => state.productList.search);
  return (
    <>
      <div className="form-row-search placeholder">
        <div className="form-field-wrapper">
          <div className="form-field">
            <Autocomplete data={dataProductList} classNameInput="form-input topSearch-field" placeholderInput="Search by keyword, style etc" titleInput="Enter search words"/>
          </div>
        </div>
        <button className="btn btn-link" type="submit">
          {/* disabled="disabled" */}
          search
        </button>
      </div>
      
      <div className="results">
        <div className="results-area">
          <div id="search-suggestions">
            <div className="suggestions">
              <h2>Trending searches</h2>
              <ul>
                <li>
                  <a href="#Boots">Boots</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
