import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './components/styles/stylesheet/styles.css'
import Routers from './router/Router'
import './components/styles/stylesheet/resp-animations.css'
import { auth } from './firebase'
import { Authstate } from './firebase'
import { supabase } from './supabaseClient'

const root = ReactDOM.createRoot(document.getElementById('root'));
const Authmoment = () => {
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    document.body.style.backgroundPositionY = -scrollPosition / 2 + "px";
  };

  // Escucha los cambios en el estado de autenticación del usuario
  return supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
      // Obtener el rol del usuario desde el user_metadata
      const rol = session.user.user_metadata.rol;
      const departament = session.user.user_metadata.departament;
      const subdepartament = session.user.user_metadata.subdepartament;
      const area = session.user.user_metadata.area;

  

      // Renderizar las rutas con el estado y el rol del usuario
      root.render(<Routers state={true} rol={rol} departament={departament} subdepartament={subdepartament} area={area}  />);
    } else {
      console.log("no user");
      root.render(<Routers state={false} />);
    }
  });
};

Authmoment();

/*ReactDOM.createRoot(document.getElementById('root')).render(
  <Routers state />
)*/
