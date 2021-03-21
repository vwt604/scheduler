import React, { Fragment} from 'react';
import 'components/Appointment/styles.scss'
import Header from 'components/Appointment/Header.js';
import Show from 'components/Appointment/Show.js';
import Empty from 'components/Appointment/Empty.js';
import Form from 'components/Appointment/Form.js';
import Status from 'components/Appointment/Status.js';
import Confirm from 'components/Appointment/Confirm.js';
import Error from 'components/Appointment/Error.js';
import useVisualMode from 'hooks/useVisualMode.js';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
		props.interview ? SHOW : EMPTY
	);

  // console.log('this is props from index.js', props)
  
  //
  const save = function(name, interviewer) { //where do these values come from? Form?
    console.log('this is interview from index.js')
    console.log(name);
    console.log(interviewer);
    const interview = {
      student: name, 
      interviewer //id
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW)) //transitions to show after calling props.bookInterview
      .catch((err) => transition(ERROR_SAVE, true));
  }

  const deleteAppt = function(boolean) {

    if(!boolean) {
      transition(CONFIRM)
    }

    if(boolean) {
      transition(DELETING, true)
  
      props.cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch((err) => console.log(err));
    }
  }



  return (
    <article className="appointment">
    <Header time={props.time} /> 
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />} 
    {mode === CREATE && 
      <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    }
    {mode === SAVING && <Status message="Saving appointment..." />}
    {mode === ERROR_SAVE && 
      <Error 
        message="Error in saving appointment. Please try again." 
        onClose={back}
      />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => deleteAppt(false)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === DELETING && <Status message="Deleting appointment..." />}
    {mode === EDIT && 
      <Form
        name={props.interview.student} // !! Using "name" and not "student"
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />
    }
    {mode === CONFIRM &&  
      <Confirm
        message="Delete this appointment?"
        onConfirm={() => deleteAppt(true)}
        onCancel={back}
      />
    }
    </article>
  )
};

