import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './components/styles/stylesheet/styles.css';
import Routers from './router/Router';
import './components/styles/stylesheet/resp-animations.css';
import { auth } from './firebase';
import { supabase } from './supabaseClient';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      document.body.style.backgroundPositionY = -scrollPosition / 2 + 'px';
    };

    // Escucha los cambios en el estado de autenticación del usuario
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // Obtener el rol del usuario desde el user_metadata
        const rol = session.user.user_metadata?.rol;
        const departament = session.user.user_metadata?.departament;
        const subdepartament = session.user.user_metadata?.subdepartament;
        const area = session.user.user_metadata?.area;

        // Establecer el estado de autenticación y los datos del usuario
        setAuthState({
          isAuthenticated: true,
          rol,
          departament,
          subdepartament,
          area,
        });
      } else {
        // No hay usuario autenticado
        setAuthState({
          isAuthenticated: false,
          rol: null,
          departament: null,
          subdepartament: null,
          area: null,
        });
      }
    });

    // Limpia el oyente cuando el componente se desmonta
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <div>
      {/* Renderiza las rutas basadas en el estado de autenticación */}
      {authState !== null ? (
        <Routers
        state={authState.isAuthenticated}
          rol={authState.rol}
          departament={authState.departament}
          subdepartament={authState.subdepartament}
          area={authState.area}
        />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

root.render(<App />);
 