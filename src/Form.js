import { useState, useEffect } from "react";
import * as yup from "yup";
import yupPassword from "yup-password";
import axios from "axios";

yupPassword(yup);

const schema = yup.object().shape({
  fname: yup.string().required("First name is required"),
  lname: yup.string().required("Last name is required"),
  email: yup
    .string()

    .email("Invalid email")
    .required("Valid email address is required"),
  password: yup
    .string()
    .password(
      "Password must contain at least 8 characters, at most 250 characters, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 number and at least 1 symbol"
    )
    .required("Password is required"),
  consent: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms & Service Conditions"),
});

export default function Form() {
  // [ ] Render the submit button

  // [x] Define validation schema
  //* might need to move this out of the Form

  // [x] Set up state
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    consent: false,
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    consent: "",
  });

  // [x] Handle Form Changes
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const [disabled, setDisabled] = useState(true);

  // [x] Submit Form
  const formSubmit = (evt) => {
    evt.preventDefault();
    // - when we click submit, let's create a new user
    const newUser = {
      fname: formData.fname.trim(),
      lname: formData.lname.trim(),
      email: formData.email,
      password: formData.password,
      consent: formData.consent,
    };
    // - also when we click, let's send this data somewhere
    axios
      .post("https://reqres.in/api/users", newUser) //where to and what?
      .then((res) => {
        //- once we post successfully, clear the form
        setFormData({
          fname: "",
          lname: "",
          email: "",
          password: "",
          consent: false,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // [x] Perform validation
  //   useEffect(() => {
  //     schema.isValid(formData).then((valid) => setDisabled(!valid));
  //   });

  // [x] Render Form and display Errors
  return (
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form
          onSubmit={formSubmit}
          className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
        >
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
          />
          {errors.fname && (
            <div className="text-red-500 text-sm">{errors.fname}</div>
          )}
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
          />
          {errors.lname && (
            <div className="text-red-500 text-sm">{errors.lname}</div>
          )}

          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}

          <label className="text-xs block w-full pb-3">
            {" "}
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />{" "}
            Agree to the Terms & Service Conditions
          </label>
          {errors.consent && (
            <div className="text-red-500 text-sm">{errors.consent}</div>
          )}

          <button
            type="submit"
            // disabled={disabled}
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1 disabled:bg-slate-300 disabled:text-slate-500"
          >
            Create Account
          </button>
        </form>
      </div>
  );
}
