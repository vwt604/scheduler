/*

The <li> represents the entire day item
The <h2> should display the day name
The <h3> should display the spots remaining for a day

DayListItem component takes in three attributes:
(name, spots, selected) 
and one action (setDay) as props

To display the text "{props.spots} spots remaining" and to determine if the day is full. 
The DayListItem knows what it means to be full but not what it means to be selected


*/

import React from 'react';
import classNames from 'classnames/bind';
import 'components/DayListItem.scss';

function formatSpots (value) {
  if (value === 0) return `no spots remaining`
  else if (value === 1) return `1 spot remaining`
  else return `${value} spots remaining`
}


// Functional component
export default function DayListItem(props) {

  const { name, spots, selected, setDay } = props

  const dayClass = classNames(
    "day-list__item",
    {
      "day-list__item--selected": selected,
      "day-list__item--full": (spots === 0)
    })
  
  // Implementing props
  return (
    <li 
      className={dayClass}
      onClick={setDay}
    >
      <h2 className="text-regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
      {props.children}
    </li>
  );
}
