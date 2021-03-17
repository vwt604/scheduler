import React from 'react';
import DayListItem from 'components/DayListItem.js';

export default function DayList(props) {

  const { days, day, setDay } = props

  const dayListItems = days.map(dayItem => {
    return (
      <DayListItem
        key={dayItem.id}
        name={dayItem.name}
        spots={dayItem.spots}
        selected={dayItem.name === day}
        setDay={event => setDay(dayItem.name)}
      />
    );
  });

  return(
    <ul>
      {dayListItems}
    </ul>
  );
};