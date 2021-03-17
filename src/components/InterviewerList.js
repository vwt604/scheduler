import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem.js';
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {

  const { interviewers, currentInterviewer, setInterviewer } = props

  const interviewerListItems = interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        id={interviewer.id}
        avatar={interviewer.avatar}
        selected={interviewer.id === currentInterviewer}
        setInterviewer={setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  )

}