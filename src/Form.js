import * as Yup from "yup";
/*
# Checklist
[ ] form UI
[ ] submit handler
[ ] yup schema
[ ] apply yup validations
*/

// [ ] Yup schema goes here

export default function Form() {
  //[x] Create a submit event
  const formSubmit = (evt) => {
    evt.preventDefault();
    console.log("submitted");
  };
  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
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
            placeholder="First Name"
          />
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="lname"
            placeholder="Last Name"
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
          />

          <label className="text-xs block w-full pb-3">
            {" "}
            <input type="checkbox" name="consent" /> Agree to the Terms &
            Service Conditions
          </label>

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
