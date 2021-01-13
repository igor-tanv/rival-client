import React, { useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { apiFetch } from "../../modules/api-fetch";
import Form from "./form";

import weightClasses from "../../data/weight-classes.json";
import matchTypes from "../../data/match-types.json";

import convertDateToUnix from "../../hooks/convert-date-to-unix"

function isRequired(v) {
  return v && v.length > 0 ? null : "is required";
}

function isSelected(v) {
  return v ? null : "is required";
}

function didAgree(checked) {
  return checked ? null : "must be agreed to";
}

const defaultValues = {
  playerId: "",
  opponentId: "",
  startsAt: new Date(),
  weightClass: null,
  location: "",
  refereeName: "",
  type: null,
  ruleExceptions: "",
  acceptsTos: false,
};

function IssueContract({ match }) {
  const [values, setValues] = useState({
    ...defaultValues,
    playerId: localStorage.getItem("playerId"),
    opponentId: match.params.id,
  });
  const [submitted, setSubmitted] = useState(false);
  const [opponent, setOpponent] = useState({ firstName: "", lastName: "" });

  const validations = {
    weightClass: [isSelected],
    type: [isSelected],
    location: [isRequired],
    refereeName: [isRequired],
    acceptsTos: [didAgree],
  };

  const [errors, setErrors] = useState(
    Object.keys(validations).reduce((acc, key) => {
      acc[key] = null;
      return acc;
    }, {})
  );

  useEffect(() => {
    apiFetch(`players/${match.params.id}`).then((json) =>
      setOpponent(json.player)
    );
  }, []);

  function valid() {
    return Object.keys(validations)
      .flatMap((key) => validations[key].map((v) => v(values[key])))
      .every((e) => e === null);
  }

  function validate(key, validations) {
    const errors = validations.map((v) => v(values[key]));
    setErrors((prev) => ({
      ...prev,
      [key]: errors,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    apiFetch(`contracts`, "post", {
      ...values,
      startsAt: convertDateToUnix(values.startsAt),
    })
      .then((json) => {
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (values.playerId === values.opponentId)
    return <Redirect to="/profile"></Redirect>;

  return (
    <div>
      <h1>Challenge Contract</h1>

      {submitted ? (
        <>
          <h3>
            You have challenged {opponent.firstName} {opponent.lastName} to a
            match!
          </h3>
          <h4>When they accept or reject you will be notified via email</h4>
        </>
      ) : (
          <Form
            handleSubmit={handleSubmit}
            opponent={opponent}
            values={values}
            setValues={setValues}
            matchTypes={matchTypes}
            weightClasses={weightClasses}
            valid={valid}
            errors={errors}
            validate={validate}
            validations={validations}
          />
        )}
    </div>
  );
}

export default withRouter(IssueContract);