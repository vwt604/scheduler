import React from 'react';
import classNames from 'classnames/bind';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  
  const { id, name, avatar, selected, setInterviewer } = props

  const interviewersClass = classNames(
      "interviewers__item", 
      { "interviewers__item--selected": selected }
  )
  
  const interviewersImgClass = classNames(
      "interviewers__item-image", 
      { "interviewers__item-image--selected": selected }
  )
  
  return (
    <li 
      className={interviewersClass}
      onClick={() => setInterviewer(id)}
    >
      <img
        className={interviewersImgClass}
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
};