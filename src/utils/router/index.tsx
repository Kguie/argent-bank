import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/home/Home";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import SignIn from "../../pages/signIn/SignIn";
import User from "../../pages/user/User";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {routes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

const routes = [
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/user/:id", element: <User /> },
];
