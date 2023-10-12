import React from 'react';
import Box from '../components/Box';
import { useNavigate } from 'react-router-dom';


function Classical_Pregame_Screen() {
  const navigate = useNavigate();

  return (
    <div>
        <Box
          title="Starta spel"
          content="Tryck här för att påbörja din omgång."
          onClick={() => {
              navigate('/classic');
          }}
        />
        <Box
          title="Förklaring och spelregler"
          content="Om du är ny till på spåret eller behöver en påminnelse om hur det fungerar kan du trycka här."
          onClick={() => {
              navigate('/explanation');
          }}
        />
        <Box
          title="Topplista"
          content="Se en lista över de bästa omgångarna av På Spårdles användare."
          onClick={() => {
              navigate('/topplista');
          }}
        />
    </div>
  );
}

export default Classical_Pregame_Screen;
