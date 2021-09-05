import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  console.log("INTERVIEW LIST PROPS: ", props.interviewers)
  //LINE 15: props.setInterviewer is not a function
  const parsedInterviewers = props.interviewers.map((inter) => {
    return (
      <InterviewerListItem
        key={inter.id}
        name={inter.name}
        avatar={inter.avatar}
        selected={inter.id === props.interviewer}
        setInterviewer={(event) => props.setInterviewer(inter.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  );
}

//setInterviewer={(event) => setInterviewer(interviewer)}
