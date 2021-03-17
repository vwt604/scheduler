import React from 'react';
import classNames from 'classnames/bind';
import 'components/Appointment/styles.scss'

export default function Header(props) {

  const { time } = props

  return(
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  )
}