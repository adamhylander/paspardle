import React from 'react';
import Box from '../components/Box';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        title="Klassiskt spel"
        content="Det här är den klassiska versionen av på spåret"
        onClick={() => {
          navigate('/pregame_classic');
        }}
      />
      <Box
        title="Närmast vinner"
        content="Försök att ta reda på vart vi befinner oss på en karta. Den som är kortast distans från målet vinner"
        onClick={() => {
          navigate('/closestwins');
        }}
      />
       <Box
        title="Användarsida & matchhistorik"
        content="Klicka här för att se din användarsida och matchhistorik"
        onClick={() => {
          navigate('/profile');
        }}
      />
    </div>
  );
}

export default Welcome;
