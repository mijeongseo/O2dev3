import React, { useCallback } from 'react';

declare module 'react' {
  interface HTMLProps<T> {
    index?: string;
  }
}

export default function ImagelistCheckbox({ index, id, date, location, type, onChecked, check, onActive }) {
  return (
    <ul className={`table_common_attr down_image_list ${index === 0 && 'on'}`} onClick={onActive} id={index}>
      <li>{date}</li>
      <li title={typeof location !== 'string' && location[1]}> {typeof location === 'string' ? location : location[2]}</li>
      <li>{type}</li>
      <li className="checkbox_li">
        <input
          type="checkbox"
          id={id}
          onChange={onChecked}
          checked={check}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <label htmlFor={id} className="listcheckbox"></label>
      </li>
    </ul>
  );
}
