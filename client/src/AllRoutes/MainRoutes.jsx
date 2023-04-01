
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";
import ProfilePage from "../pages/profile/ProfilePage";
import MyStore from "../pages/myStore/MyStore";


export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/profile" element={<ProfilePage/>}></Route>
      <Route path="/mystore" element={<MyStore/>}></Route>
    </Routes>
  );
}