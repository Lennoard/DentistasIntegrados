import {BrowserRouter, Route, Routes,} from "react-router-dom";
import SignIn from "./presentation/pages/SignIn";
import LandingPage from "./presentation/pages/LandingPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};
