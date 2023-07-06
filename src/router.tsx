import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./presentation/pages/SignIn";
import LandingPage from "./presentation/pages/LandingPage";
import SignUp from "./presentation/pages/SignUp";
import Home from "./presentation/pages/Home";
import Profile from "./presentation/pages/Profile";
import EditProfile from "./presentation/pages/Profile/Edit";
import NewConsultation from "./presentation/pages/Consultation/NewConsultation";
import Consultations from "./presentation/pages/Consultation";
import ConsultationDetails from "./presentation/pages/Consultation/Details";

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
        <Route path="consultas">
          <Route index={true} element={<Consultations />} />
          <Route path="nova" element={<NewConsultation />} />
          <Route path="detalhes" element={<ConsultationDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
