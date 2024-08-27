import React, { useState } from "react";
import { IconButton } from "../styled/Buttons";
import { Tag } from "../styled/Library";
const { MoodLabel, MoodInput } = require("../styled/Forms");

const Autocomplete = props => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState([]);
  const [selectionUpdate, setSelectionUpdate] = useState(0);

  const updateSelected = selection => {
    const tempSelected = selected;
    tempSelected.push(selection);
    setSelected(tempSelected);
    setSelectionUpdate(selectionUpdate + 1);
  };

  const removeSelected = selection => {
    const tempSelected = selected;
    const index = selected.indexOf(selection);
    tempSelected.splice(index, 1);
    setSelected(tempSelected);
    setSelectionUpdate(selectionUpdate + 1);
  };

  const onChange = e => {
    const { suggestions } = props;
    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1 &&
        selected.indexOf(suggestion) === -1
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };

  const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput("");
    updateSelected(e.currentTarget.innerText);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      // enter key
      e.preventDefault();
      setActive(0);
      setIsShow(false);
      if (filtered[active]) updateSelected(filtered[active]);
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1);
    } else {
      onChange(e);
    }
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="autocomplete">
            <li className="header">
              {" "}
              <h4>Genres</h4>
              <i className="fab fa-spotify"></i>
            </li>
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  <i className="fas fa-genderless"></i>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <MoodLabel>
      {props.label}
      <MoodInput
        type="text"
        placeholder={props.placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {renderAutocomplete()}
      {selected.length > 0 && (
        <div className="chipset">
          {selectionUpdate &&
            selected.map(d => (
              <Tag key={d}>
                <i
                  className="fas fa-times"
                  onClick={() => removeSelected(d)}
                ></i>
                {d}
              </Tag>
            ))}
        </div>
      )}
    </MoodLabel>
  );
};

export default Autocomplete;
