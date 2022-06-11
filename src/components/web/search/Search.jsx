import React, { useState } from 'react';
// import { Controller } from 'react-hook-form';

import { useSelector } from 'react-redux';
import Autocomplete from 'components/autoComplete';
import { useHistory } from 'react-router-dom';

function Search() {
  const history = useHistory();
  const handleOnClick = () => {
    let queryString = `q=${value}`;
    history.push(`/search?${queryString}`);
  };
  const dataProductList = useSelector((state) => state.productList.search);
  const [suggestions, setSuggestions] = useState();
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [value, setValue] = useState('');
  let noResult;
  const handleClick = () => {
    setSuggestions([]);
    setValue('');
    setSuggestionsActive(false);
  };
  if (value !== '' && suggestions.length === 0) {
    noResult = true;
  } else {
    noResult = false;
  }
  const renderPrimary = () => {
    if (noResult) {
      return (
        <div className="search-results-container no-results">
          <div className="search-header">
            <h1>Xin lỗi, chúng tôi không tìm thấy kết quả cho "{value}"</h1>
          </div>
          <div className="noresults-top">
            <div>
              <p>Kiểm tra lại chính tả</p>
              <p>Sử dụng quá ít từ</p>
              <p>Từ tìm kiếm không khớp</p>
            </div>
          </div>
        </div>
      );
    }
    if (suggestionsActive) {
      return (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => {
            return (
              <li key={index}>
                <a className="minicart-product-name cursor" href={`/productinf/${suggestion._id}`} title={suggestion.name} onClick={handleClick}>
                  {suggestion.name}
                </a>
              </li>
            );
          })}
        </ul>
      );
    }
    return (
      <div className="suggestions">
        <h2>Tìm kiếm nhiều nhất</h2>
        <ul>
          <li>
            <a href="#Boots">Boots</a>
          </li>
        </ul>
      </div>
    );
  };
  const Suggestions = () => {
    return (
      <div className="results">
        <div className="results-area">
          <div id="search-suggestions">
            <div id="primary" className="primary-content">
              {renderPrimary()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="form-row-search placeholder">
        <div className="form-field-wrapper">
          <div className="form-field">
            <Autocomplete
              data={dataProductList}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              setSuggestionsActive={setSuggestionsActive}
              suggestionIndex={suggestionIndex}
              setValue={setValue}
              value={value}
              setSuggestionIndex={setSuggestionIndex}
              classNameInput="form-input topSearch-field"
              placeholderInput="Search by keyword, style etc"
              titleInput="Enter search words"
            />
          </div>
        </div>
        {noResult ? (
          <button className="btn btn-link" type="submit" disabled>
            search
          </button>
        ) : (
          <button className="btn btn-link" type="submit" onClick={handleOnClick}>
            search
          </button>
        )}
      </div>
      {<Suggestions />}
    </>
  );
}

export default Search;
