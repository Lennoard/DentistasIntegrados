import {BrowserRouter, Route, Routes,} from "react-router-dom";
import SignIn from "./presentation/pages/SignIn";
import LandingPage from "./presentation/pages/LandingPage";
import SignUp from "./presentation/pages/SignUp";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
