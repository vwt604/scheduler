import React from "react";
import classNames from "classnames/bind";
import "components/Button.scss";

export default function Button(props) {
  const { onClick, disabled, children, confirm, danger } = props
  
  const buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
