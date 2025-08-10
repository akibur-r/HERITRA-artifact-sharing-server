import RootLayout from "@/layouts/RootLayout";
import AddArtifact from "@/pages/AddArtifact/AddArtifact";
import ArtifactDetails from "@/pages/ArtifactDetails/ArtifactDetails";
import BlogPage from "@/pages/BlogPage/BlogPage";
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import ExploreArtifactsPage from "@/pages/ExploreArtifactsPage/ExploreArtifactsPage";
import HomePage from "@/pages/HomePage/HomePage";
import LikedArtifactsPage from "@/pages/LikedArtifacts/LikedArtifactsPage";
import MyArtifactsPage from "@/pages/MyArtifacts/MyArtifactsPage";
import MyProfilePage from "@/pages/MyProfile/MyProfilePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage/PrivacyPolicyPage";
import RegisterPage from "@/pages/Register/RegisterPage";
import SignInPage from "@/pages/SignIn/SignInPage";
import TermsOfUsePage from "@/pages/TermsOfUsePage/TermsOfUsePage";
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
        path: "/explore",
        Component: ExploreArtifactsPage,
      },
      {
        path: "/learn",
        Component: BlogPage,
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
        element: <ArtifactDetails />,
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
      {
        path: "/terms-of-use",
        Component: TermsOfUsePage,
      },
      {
        path: "/privacy-policy",
        Component: PrivacyPolicyPage,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
