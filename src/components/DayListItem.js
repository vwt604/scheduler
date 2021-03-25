import React from "react";
import classNames from "classnames/bind";
import "components/DayListItem.scss";

function formatSpots(value) {
  if (value === 0) return `no spots remaining`;
  else if (value === 1) return `1 spot remaining`;
  else return `${value} spots remaining`;
}

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <li className={dayClass} onClick={setDay} data-testid="day">
      <h2 className="text-regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
      {props.children}
    </li>
  );
}
