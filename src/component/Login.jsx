import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
const Login = () => {
  const {
    handleSubmit2,
    handleChange,
    // formData,
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    setCurrentState,
    navigate,
  } = useContext(StoreContext);

  return (
    <div className="container flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex items-center w-[90%] sm:max-w-4xl">
        <div className="hidden md:flex w-1/2 h-full items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-30848.jpg"
            alt="Login"
            className="object-cover rounded-lg shadow-md w-[400px]"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col items-center">
          <div className="inline-flex gap-2 mb-3 mt-4 items-center">
            <p className="text-3xl font-semibold text-gray-800">Login</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              name="email"
              type="email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              className="input border border-gray-400 rounded-xl py-2 px-2 focus:outline-none placeholder:px-2 focus:ring-2 focus:ring-gray-500"
              required
            />
            {errors.email && touched.email ? (
              <p className="text-red-600 text-sm px-1">{errors.email}</p>
            ) : null}
            <input
              name="password"
              type="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="input border border-gray-400 rounded-xl px-2 py-2 focus:outline-none placeholder:px-2 focus:ring-2 focus:ring-gray-500"
              required
            />
            {errors.password && touched.password ? (
              <p className="text-red-600 text-sm px-1">{errors.password}</p>
            ) : null}
            <div className="w-full flex justify-between text-sm text-gray-600">
              <p className="cursor-pointer hover:text-gray-900">
                Forgot your password?
              </p>
              <p
                className="cursor-pointer hover:text-gray-900"
                onClick={() => {
                  setCurrentState("Sign Up");
                  navigate("/signup");
                }}
              >
                create account
              </p>
            </div>
            <button
              type="submit"
              className="bg-gray-800 text-white font-semibold py-3 px-8 mt-4 rounded-lg shadow-md hover:bg-gray-900 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
