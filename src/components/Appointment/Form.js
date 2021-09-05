import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  console.log("FORM PROPS.INTERVIEWERS: ====", props.interviewers)
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function () {
    setName("");
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };
  //LINE 47: props.onSave is not a function
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            value={name}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={event => setName(event.target.value)}
            /*
          This must be a controlled component
        */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
