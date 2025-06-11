import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (currentState === "Sign Up") {
      const { name, email, password, confirmPassword, phone } = formData;

      if (!name || !email || !password || !confirmPassword || !phone) {
        toast("All fields are required");
        return;
      }

      if (password !== confirmPassword) {
        toast("Passwords do not match");
        return;
      }

      const user = users.find((u) => u.email === email);
      if (user) {
        toast("User already exists");
        return;
      }

      users.push({ name, email, password, phone });
      localStorage.setItem("users", JSON.stringify(users));
      toast.success("User registered successfully!");
      setCurrentState("Login");
      navigate("/login");
    } else {
      const { email, password } = formData;
      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (matchedUser) {
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
        currentState,
        setCurrentState,
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        navigate,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext };
export default StoreContextProvider;
