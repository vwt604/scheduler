import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header.js";
import Show from "components/Appointment/Show.js";
import Empty from "components/Appointment/Empty.js";
import Form from "components/Appointment/Form.js";
import Status from "components/Appointment/Status.js";
import Confirm from "components/Appointment/Confirm.js";
import Error from "components/Appointment/Error.js";
import useVisualMode from "hooks/useVisualMode.js";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW)) 
      .catch((err) => transition(ERROR_SAVE, true));
  };

  const deleteAppt = function (boolean) {
    if (!boolean) {
      transition(CONFIRM);
    }

    if (boolean) {
      transition(DELETING, true); 

      props
        .cancelInterview(props.id)
        .then(() => transition(EMPTY))
        .catch((err) => transition(ERROR_DELETE, true));
    }
  };

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message="Saving appointment..." />}
      {mode === ERROR_SAVE && (
        <Error message="Could not save." onClose={back} />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => deleteAppt(false)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === DELETING && <Status message="Deleting appointment..." />}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete." onClose={back} />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student} // !! Using "name" and not "student"
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete this appointment?"
          onConfirm={() => deleteAppt(true)}
          onCancel={back}
        />
      )}
    </article>
  );
}
