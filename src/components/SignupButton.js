import './styling/LoginButton.css'
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    const currentUrl = window.location.pathname;
    await loginWithRedirect({
      appState: {
        returnTo: currentUrl,
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className="LoginButton" onClick={handleSignUp}>
      Sign Up
    </button>
  );
};