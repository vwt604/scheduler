import React, { useState } from 'react'
import classNames from 'classnames/bind';
import 'components/Appointment/styles.scss';
import Button from "components/Button.js";
import InterviewerList from "components/InterviewerList.js";


export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const {interviewers, onSave, onCancel} = props;

  function reset() {
    setName("");
    setInterviewer(null);
  };

  function cancel() {
    reset();
    onCancel();
  };

  return(
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
          autoComplete="off"
          onSubmit={event => event.preventDefault()}
          >
          <input 
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => setName(event.target.value)}
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList 
          interviewers={interviewers} 
          currentInterviewer={interviewer} 
          setInterviewer={setInterviewer} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={onSave}>Save</Button>
        </section>
      </section>
    </main>
  )
}