import './styling/LoginButton.css'
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    const currentUrl = window.location.pathname;
    await loginWithRedirect({
      appState: {
        returnTo: currentUrl,
      },
    });
  };

  return (
    <button className="LoginButton" onClick={handleLogin}>
      Log In
    </button>
  );
};

export default LoginButton;
