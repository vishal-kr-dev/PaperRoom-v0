import { createBrowserRouter } from "react-router-dom";
import LoginForm from "./components/Login";
import SignUpForm from "./components/Signup";

export const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginForm />
    },
    {
      path: '/signup',
      element: <SignUpForm />
    }
  ])