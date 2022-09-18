import { useState, useEffect, useReducer, useRef } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import MyForm from "./components/MyForm";
import { Card } from "react-bootstrap";
export const ACTIONS = {
  CREATE: "create",
  DELETE: "delete",
  UPDATE: "update",
};
export const personObj = {
  name: "",
  lname: "",
  age: "",
  nationalId: "",
  city: "",
  education: "",
  score: "",
  nationality: "",
  height: "",
  weight: "",
  hairColor: "",
};
function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.CREATE:
      return [
        ...todos,
        {
          id: Math.floor(Math.random() * 100),
          character: NewPerson(action.payload),
        },
      ];

    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== action.payload.id);

    case ACTIONS.UPDATE:
      return Update(todos, action.payload);

    default:
  }
}
function NewPerson(payload) {
  const newPerson = [];
  for (let key of Object.keys(personObj)) {
    newPerson.push({ [key]: payload[key].value });
  }
  return newPerson;
}
function Update(todos, payload) {
  for (let char of todos) {
    if (payload.id == char.id) {
      let i = 0;
      for (let key of Object.keys(personObj)) {
        console.log(payload.event[key].value);
        char.character[i][key] = payload.event[key].value;
        i++;
      }
    }
  }

  return todos;
}
function App() {
  const formRef = useRef();
  const [formId, setFormId] = useState(100);
  const [curChar, setCurChar] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [persons, dispatch] = useReducer(reducer, []);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    for (let char of persons) {
      if (formId == char.id) {
        setCurChar(char.character);
      }
    }
  }, [formId]);
  console.log(persons);
  return (
    <div className="App container-md">
      <div class="row">
        <div class="col-9">
          {showForm ? (
            <MyForm
              persons={persons}
              dispatch={dispatch}
              formId={formId}
              formRef={formRef}
              setShowForm={setShowForm}
              curChar={curChar}
              isUpdate={isUpdate}
              setIsUpdate={setIsUpdate}
              setFormId={setFormId}
            />
          ) : (
            <div></div>
          )}
        </div>
        <div class="col-3">
          {persons.map((element) => {
            return (
              <Card
                style={
                  formId == element.id
                    ? { borderColor: "red" }
                    : { borderColor: "blue" }
                }
              >
                <Card.Body>
                  <Card.Title>
                    {element.character[0].name} {element.character[1].lname}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    id: {element.id}
                  </Card.Subtitle>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      dispatch({
                        type: ACTIONS.DELETE,
                        payload: { id: element.id },
                      });
                    }}
                  >
                    delete
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      setFormId(element.id);
                      setShowForm(true);
                      setIsUpdate(true);
                    }}
                  >
                    edit
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              setShowForm(true);
              if (formRef.current) {
                formRef.current.reset();
              }
              setCurChar(null);
              setIsUpdate(false);
              setFormId(100);
            }}
          >
            add new profile
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;