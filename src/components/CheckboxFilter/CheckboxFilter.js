import React from 'react';
import './CheckboxFilter.css';

function CheckboxFilter() {

  return (
    <label
      className="checkbox"
    >
      <input
        className="checkbox__invisible-checkbox"
        type="checkbox"
      />
      <span className="checkbox__pseudo-checkbox"></span>
      <span className="checkbox__label">Короткометражки</span>
    </label>
  );
}

export default CheckboxFilter;
