import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import { signUpSchema } from "../component/Validation";
const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [currentState, setCurrentState] = useState("Login");
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  };
  const { values, touched, handleChange, handleSubmit, errors, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, actions) => {
        handleSubmit2(values);
        actions.setSubmitting(false);
      },
    });

  const navigate = useNavigate();

  const handleSubmit2 = (values) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (currentState === "Sign Up") {
      const { name, email, password, confirmPassword, phone } = values;

      if (!name || !email || !password || !confirmPassword || !phone) {
        toast("All fields are required");
        return;
      }

      const user = users.find((u) => u.email === email);
      if (user) {
        toast("User already exists");
        return;
      }

      users.push({ name, email, password, phone, id: uuidv4() });
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("User registered successfully!");
      setCurrentState("Login");
      navigate("/login");
    } else {
      const { email, password } = values;
      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (matchedUser) {
        localStorage.clear();
        localStorage.removeItem("loggedInUser");

        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));

        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        toast("Invalid email or password");
      }
    }
  };
  return (
    <StoreContext.Provider
      value={{
        values,
        touched,
        handleChange,
        handleSubmit,
        errors,
        handleBlur,
        currentState,
        setCurrentState,
        handleSubmit2,
        navigate,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreContextProvider;
