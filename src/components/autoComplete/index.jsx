import { useState } from 'react';

const AutoComplete = (props) => {
  const { data, classNameInput, placeholderInput, titleInput } = props;
  const [suggestions, setSuggestions] = useState();
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');
  let newArr = [];
  data.forEach((element) => {
    newArr.push({ _id: element._id, name: element.name });
  });
  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 0) {
      var filterSuggestions = newArr.filter(function (el) {
        return el.name.toLowerCase().indexOf(query) > -1;
      });
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };
  console.log(suggestions);
  const handleClick = (e) => {
    setSuggestions([]);
    setValue(e.target.innerText);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (e) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW
    else if (e.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          return (
            <li className={index === suggestionIndex ? 'active' : ''} key={index} onClick={handleClick}>
              <a className="minicart-product-name cursor" href={`/productinf/${suggestion._id}`} title={suggestion.name}>
                {suggestion.name}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="autocomplete">
      <input type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown} className={classNameInput} placeholder={placeholderInput} title={titleInput} />
      {suggestionsActive && <Suggestions />}
    </div>
  );
};

export default AutoComplete;
