import React, { Fragment} from 'react';
import classNames from 'classnames/bind';
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';

export default function Appointment(props) {
  const { time, interview } = props;

  return(
    <article className="appointment">
      <Header time={time} />
      { interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty /> }
    </article>
  );
};