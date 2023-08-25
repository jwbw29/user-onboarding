import * as yup from "yup";

import yupPassword from "yup-password";

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
    <div className="container mt-4 max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <form
        onSubmit={onSubmit}
        className="bg-white px-6 py-8 rounded shadow-md text-black w-full"
      >
        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mt-4"
          name="first_name"
          value={values.first_name}
          onChange={onChange}
          placeholder="First Name"
        />
        <div id="fname-error" className="text-red-500 text-sm">
          {errors.first_name}
        </div>

        <input
          type="text"
          className="block border border-grey-light w-full p-3 rounded mt-4"
          name="last_name"
          value={values.last_name}
          onChange={onChange}
          placeholder="Last Name"
        />
        <div id="lname-error" className="text-red-500 text-sm">
          {errors.last_name}
        </div>

        <input
          type="email"
          className="block border border-grey-light w-full p-3 rounded mt-4"
          name="email"
          value={values.email}
          onChange={onChange}
          placeholder="Email"
        />
        <div id="email-error" className="text-red-500 text-sm">
          {errors.email}
        </div>

        <input
          type="password"
          className="block border border-grey-light w-full p-3 rounded mt-4"
          name="password"
          value={values.password}
          onChange={onChange}
          placeholder="Password"
        />
        <div id="password-error" className="text-red-500 text-sm">
          {errors.password}
        </div>

        <label className="text-xs block w-full py-4">
          {" "}
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={onChange}
          />{" "}
          Agree to the Terms & Service Conditions
        </label>
        <div id="consent-error" className="text-red-500 text-sm">
          {errors.consent}
        </div>

        <button
          id="createBtn"
          disabled={disabled}
          className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
