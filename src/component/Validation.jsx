import * as Yup from "yup";
export const signUpSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .max(10, "Name must not exceed 10 characters")
    .required("Please enter your name"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter your email"),

  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .required("Please enter your phone number"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please enter your password"),

  confirmPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});
