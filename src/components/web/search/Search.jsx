import React from 'react';
// import { Controller } from 'react-hook-form';

import PropTypes from 'prop-types';

Search.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function Search(props) {
  // const { form, name, label } = props;
  return (

    <>
      <div className="form-row-search placeholder">
        <div className="form-field-wrapper">
          <div className="form-field">
          <input classNameName="form-input topSearch-field"    placeholder="Search by keyword, style etc"
              title="Enter search words"></input>
            {/* <Controller
              name={name}
              id={name}
              control={form.control}
              as={<input />}
              classNameName="form-input topSearch-field"
              type="text"
              maxLength={50}
              placeholder="Search by keyword, style etc"
              title="Enter search words"
            /> */}
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
