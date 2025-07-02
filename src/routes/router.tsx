import RootLayout from "@/layouts/RootLayout";
import AddArtifact from "@/pages/AddArtifact/AddArtifact";
import AllArtifacts from "@/pages/AllArtifacts/AllArtifacts";
import ArtifactDetails from "@/pages/ArtifactDetails/ArtifactDetails";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import HomePage from "@/pages/HomePage/HomePage";
import LikedArtifactsPage from "@/pages/LikedArtifacts/LikedArtifactsPage";
import MyArtifactsPage from "@/pages/MyArtifacts/MyArtifactsPage";
import MyProfilePage from "@/pages/MyProfile/MyProfilePage";
import RegisterPage from "@/pages/Register/RegisterPage";
import SignInPage from "@/pages/SignIn/SignInPage";
import PrivateRouteProvider from "@/providers/PrivateRouteProvider";
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
        path: "/artifacts",
        Component: AllArtifacts,
      },
      {
        path: "/my-artifacts",
        element: (
          <PrivateRouteProvider>
            <MyArtifactsPage />
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/liked-artifacts",
        element: (
          <PrivateRouteProvider>
            <LikedArtifactsPage />
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/add-artifact",
        element: (
          <PrivateRouteProvider>
            <AddArtifact />
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/artifact/details/:id",
        element: (
          <PrivateRouteProvider>
            <ArtifactDetails />
          </PrivateRouteProvider>
        ),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRouteProvider>
            <MyProfilePage />
          </PrivateRouteProvider>
        ),
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
