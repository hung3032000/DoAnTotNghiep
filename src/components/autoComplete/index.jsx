const AutoComplete = (props) => {
  const { data, classNameInput, placeholderInput, titleInput } = props;
  let {suggestions,setSuggestions,setSuggestionsActive,suggestionIndex,setSuggestionIndex,value,setValue} = props
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



  return (
    <div className="autocomplete">
      <input type="text" value={value} onChange={handleChange} onKeyDown={handleKeyDown} className={classNameInput} placeholder={placeholderInput} title={titleInput} />
      
    </div>
  );
};

export default AutoComplete;
