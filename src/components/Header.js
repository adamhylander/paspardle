import React from 'react';
import './styling/Header.css'
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { SignupButton } from "./SignupButton";
import { IoMdTrain } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <header>
      <h1 id="title">
        <span onClick={() => {navigate('/');}} style={{cursor:'pointer'}}>
          PÅ-SPÅRD
          <span style={{color:"white"}}>
            LE
          </span>
          <span style={{margin:"0px 10px 0px 10px", display: "inline-block", verticalAlign: "middle"}}>
            <IoMdTrain/>
          </span>
        </span>
      </h1>
      <div className="buttons">
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <LogoutButton />
        </>
      )}
      </div>
    </header>
  );
}

export default Header;
