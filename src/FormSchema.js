import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup);

const formSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email")
    .required("Valid email address is required"),
  password: yup
    .string()
    // .password("Must contain")
    .minLowercase(
      1,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol."
    )
    .minUppercase(
      1,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol."
    )
    .minNumbers(
      1,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol."
    )
    .minSymbols(
      1,
      "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol."
    )
    .required("Password is required"),
  consent: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms & Service Conditions"),
});

export default formSchema;
