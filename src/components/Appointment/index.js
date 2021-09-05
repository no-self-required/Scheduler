import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  console.log("APPOINTMENT PROPS:", props)
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  };

  const onCancel = () => {
    back();
  };

  //Set the interviewers prop to an empty array. ?? wut
  // props.interviewers = [];

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
        />
      )}
    </article>
  );
}
