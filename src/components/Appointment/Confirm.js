import React from 'react';
import classNames from 'classnames/bind';
import 'components/Appointment/styles.scss'
import Button from "components/Button.js";

export default function Confirm(props) {
  const{ message, onConfirm, onCancel } = props

  return(
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={event => onCancel()}>Cancel</Button>
        <Button danger onClick={event => onConfirm()}>Confirm</Button>
      </section>
    </main>
  )
}