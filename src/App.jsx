import DashBoard from "./component/DashBoard";
import Login from "./component/Login";
import { Routes, Navigate, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./component/SignUp";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </Routes>
    </>
  );
};
export default App;
