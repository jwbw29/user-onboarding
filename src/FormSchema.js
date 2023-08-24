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
    .password(
      "Password must contain at least 8 characters, at most 250 characters, at least 1 lowercase letter, at least 1 uppercase letter, at least 1 number and at least 1 symbol"
    )
    .required("Password is required"),
  consent: yup
    .boolean()
    .oneOf([true], "You must agree to the Terms & Service Conditions"),
});

export default formSchema;
