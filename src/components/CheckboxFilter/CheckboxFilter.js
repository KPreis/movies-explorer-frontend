import React from 'react';
import './CheckboxFilter.css';

function CheckboxFilter({ statusCheckbox, onChange }) {
  
  const handleCheckboxChange = (evt) => {
    onChange(evt.target.checked);
  }

  return (
    <label className="checkbox" onClick={handleCheckboxChange}>
      <input
        className="checkbox__invisible-checkbox"
        type="checkbox"
        defaultChecked={statusCheckbox}
      />
      <span className="checkbox__pseudo-checkbox"></span>
      <span className="checkbox__label">Короткометражки</span>
    </label>
  );
}

export default CheckboxFilter;
