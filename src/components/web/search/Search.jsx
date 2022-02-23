import React from 'react';
// import PropTypes from 'prop-types';

// search.propTypes = {};

function search(props) {
  return (
    <div>
      <form className="search-form topSearch" action="/us/en-US/search" method="get" name="simpleSearch" noValidate="novalidate" wfd-invisible="true">
        <div className="input-area">
          <div className="container">
            <div className="form-row empty">
              <div className="form-field">
                <input className="form-input topSearch-field" type="text" id="q" name="q" autoComplete="off" placeholder="Search" defaultValue title="Enter search words" />
                <input type="submit" className="iphone-search" />
              </div>
              <div className="topSearch-btn">
                <button className="form-button" type="submit">
                  Run search
                </button>
              </div>
              <input type="hidden" name="lang" defaultValue="en" wfd-invisible="true" />
              <button className="close-search">
                <span className="visually-hidden">Close</span>
              </button>
            </div>
          </div>
        </div>
        <div className="results">
          <div className="results-area">
            <div id="search-suggestions">
              <div className="suggestions suggestions-unlogged">
                <h2>Suggested searches</h2>
                <ul>
                  <li>
                    <a href="https://www.Homie.com/us/en-US/men/">MEN</a>
                  </li>
                  <li>
                    <a href="https://www.Homie.com/us/en-US/women/">WOMEN</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default search;
