import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const {interviewers, interviewer, setInterviewer} = props

  const parsedInterviewers = interviewers.map((inter) => (
    <InterviewerListItem
      key={inter.id}
      name={inter.name}
      avatar={inter.avatar}
      selected={inter.id === interviewer}
      setInterviewer={event => setInterviewer(interviewer)}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

//setInterviewer={(event) => setInterviewer(interviewer)}