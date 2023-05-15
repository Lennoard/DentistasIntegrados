import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SignIn from "./presentation/pages/SignIn";
import LandingPage from "./presentation/pages/LandingPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" exact element={<LandingPage />}>
      <Route path="login" element={<SignIn />} />
    </Route>
  )
);
