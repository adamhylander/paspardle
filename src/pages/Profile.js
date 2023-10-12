import './styling/Profile.css'
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../components/LoginButton";
import Subheader from '../components/Subheader';
import MatchHistory from '../components/MatchHistory';
import IsLoading from '../components/IsLoading';

function Profile() {
    const { user, isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
      return <IsLoading />;
    }

    return (
        <div>
        {!isAuthenticated && (
            <div className='container'>
                <p>Du måste logga in för att kunna se din användarsida</p>
                <LoginButton />
            </div>
          )}
        {isAuthenticated && (
            <div>
              <Subheader text={"Din Profil"} />
              <div className="container">
                <img src={require('./assets/profile-pic.png')} alt="Profile pic" className="profilePic" />
                <p className="email"> {user.email} </p>
              </div>
              <MatchHistory userEmail={user.email} />
            </div>
          )}
        </div>
    );
    };

export default Profile;