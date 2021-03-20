import React, { Fragment} from 'react';
import classNames from 'classnames/bind';
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';
import Form from 'components/Appointment/Form.js';
import Status from 'components/Appointment/Status.js';
import useVisualMode from 'hooks/useVisualMode.js';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

  // console.log('this is props from index.js', props)
  
  //
  const save = function(name, interviewer) {
    console.log('this is interview from index.js')
    console.log(name);
    console.log(interviewer);
    const interview = {
      student: name, 
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW)) //transitions to show after calling props.bookInterview
      .catch((err) => console.log(err));
  }

  return (
    <article className="appointment">
    <Header time={props.time} /> 
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />} 
    {mode === CREATE && 
      <Form
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={save}
      />
    }
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer.name}
      />
    )}
    {mode === SAVING && <Status message="Saving appointment..." />}
    </article>
  )
};

/*
Not transitioning to show after saving. How to check data is save? 
Warnings after saving
*/