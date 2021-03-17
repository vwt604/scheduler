import React from "react";
import classNames from 'classnames/bind';
import "components/Button.scss";


// Renders button elements
export default function Button(props) {

   //Conditional css
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   // Adding Interactivity
    return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
 }