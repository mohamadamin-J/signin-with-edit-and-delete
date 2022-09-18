import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ACTIONS, personObj } from "../App";

export default function MyForm({
  dispatch,
  formId,
  formRef,
  setShowForm,
  curChar,
  isUpdate,
  setIsUpdate,
  setFormId,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isUpdate) {
      dispatch({ type: ACTIONS.CREATE, payload: event.target });
    } else {
      dispatch({
        type: ACTIONS.UPDATE,
        payload: {
          id: formId,
          event: event.target,
        },
      });
      setIsUpdate(false);
    }
    setFormId(100);
    setShowForm(false);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} ref={formRef}>
        {Object.keys(personObj).map((key, index) => {
          return (
            <Form.Control
              type="text"
              name={key}
              placeholder={
                curChar ? key + " " + curChar[index][key] : "enter " + key
              }
              id={index + 1}
            />
          );
        })}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}