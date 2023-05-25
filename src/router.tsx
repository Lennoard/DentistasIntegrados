import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./presentation/pages/SignIn";
import LandingPage from "./presentation/pages/LandingPage";
import SignUp from "./presentation/pages/SignUp";
import Home from "./presentation/pages/Home";
import Profile from "./presentation/pages/Profile";
import EditProfile from "./presentation/pages/Profile/Edit";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<SignIn />} />
        <Route path="cadastro" element={<SignUp />} />
        <Route path="perfil">
          <Route index={true} element={<Profile />} />
          <Route path="editar" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
