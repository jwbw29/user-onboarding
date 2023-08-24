import { useState, useEffect } from "react";
import * as yup from "yup";
import yupPassword from "yup-password";
import axios from "axios";

yupPassword(yup);

export default function Form(props) {
  const { values, change, submit, disabled, errors } = props;

  const onSubmit = (evt) => {
    evt.preventDefault();
    submit();
  };

  const onChange = (evt) => {
    const { name, value, checked, type } = evt.target;
    const valueToUse = type === "checkbox" ? checked : value;
    change(name, valueToUse);
  };

  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <form
        onSubmit={onSubmit}
        className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
      >
        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="first_name"
          value={values.first_name}
          onChange={change}
          placeholder="First Name"
        />
        <div className="text-red-500 text-sm">{errors.first_name}</div>
        {/* {errors.first_name && (
          )} */}

        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="last_name"
          value={values.last_name}
          onChange={onChange}
          placeholder="Last Name"
        />
        <div className="text-red-500 text-sm">{errors.last_name}</div>
        {/* {errors.last_name && (
          )} */}

        <input
          type="email"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          value={values.email}
          onChange={onChange}
          placeholder="Email"
        />
        <div className="text-red-500 text-sm">{errors.email}</div>
        {/* {errors.email && (
          )} */}

        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          value={values.password}
          onChange={onChange}
          placeholder="Password"
        />
        <div className="text-red-500 text-sm">{errors.password}</div>
        {/* {errors.password && (
          )} */}

        <label className="text-xs block w-full pb-3">
          {" "}
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={onChange}
          />{" "}
          Agree to the Terms & Service Conditions
        </label>
        <div className="text-red-500 text-sm">{errors.consent}</div>
        {/* {errors.consent && (
          )} */}

        <button
          type="submit"
          disabled={disabled}
          className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
