import DashBoard from "./component/DashBoard";
import Login from "./component/Login";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./component/SignUp";
import NotFound from "./component/NotFound";
import Profile from "./component/Profile";
const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/dashboard" element={<DashBoard></DashBoard>}></Route>
        {/* <Route path="*" element={<Navigate to="/login" />}></Route> */}
        <Route path="*" element={<NotFound></NotFound>}></Route>
        <Route path="profile" element={<Profile></Profile>}></Route>
      </Routes>
    </>
  );
};
export default App;
