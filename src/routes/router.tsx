import RootLayout from "@/layouts/RootLayout";
import AllArtifacts from "@/pages/AllArtifacts/AllArtifacts";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import HomePage from "@/pages/HomePage/HomePage";
import RegisterPage from "@/pages/Register/RegisterPage";
import SignInPage from "@/pages/SignIn/SignInPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/all-artifacts",
        Component: AllArtifacts,
      },
      {
        path: "/sign-in",
        Component: SignInPage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
