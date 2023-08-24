import { useState, useEffect } from "react";
import Form from "./Form";
import Members from "./Members";
import axios from "axios";
import schema from "./FormSchema";
import * as yup from "yup";

////////// INITIAL STATES ////////////
const initialFormValues = {
  ///// TEXT //////
  first_name: "",
  last_name: "",
  //// EMAIL /////
  email: "",
  //// PASSWORD //////
  password: "",
  ///// CHECKBOX //////
  consent: false,
};

const initialFormErrors = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  consent: false,
};

const initialMembers = [];
const initialDisabled = true;

function App() {
  //////////// STATES /////////////
  const [members, setMembers] = useState(initialMembers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  ////////// HELPERS //////////
  const getMembers = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((res) => {
        setMembers(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  const postNewMember = (newMember) => {
    axios
      .post("https://reqres.in/api/users")
      .then((res) => setMembers([newMember, ...members]))
      .catch((err) => console.error(err))
      .finally(() => setFormValues(initialFormValues));
  };

  //////////// EVENT HANDLERS /////////////
  const validate = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: "" }))
      .catch((err) => setFormErrors({ ...formErrors, [name]: err.errors[0] }));
  };

  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formSubmit = () => {
    const newMember = {
      first_name: formValues.first_name.trim(),
      last_name: formValues.last_name.trim(),
      email: formValues.email.trim(),
      password: formValues.password,
      consent: formValues.consent,
    };
    postNewMember(newMember);
  };

  //////// SIDE EFFECTS //////////
  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    schema.isValid(formValues).then((valid) => setDisabled(!valid));
  }, [formValues]);

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <Form
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
      <div className="container mt-8 w-1/2 mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Users</h1>

          {members.map((member) => {
            return <Members key={member.id} details={member} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
