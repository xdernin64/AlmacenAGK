import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './components/styles/stylesheet/styles.css';
import Routers from './router/Router';
import './components/styles/stylesheet/resp-animations.css';
import { auth } from './firebase';
import { supabase } from './supabaseClient';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      document.body.style.backgroundPositionY = -scrollPosition / 2 + 'px';
    };

    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        const rol = session.user.user_metadata?.rol;
        const departament = session.user.user_metadata?.departament;
        const subdepartament = session.user.user_metadata?.subdepartament;
        const area = session.user.user_metadata?.area;

        setAuthState({
          isAuthenticated: true,
          rol,
          departament,
          subdepartament,
          area,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          rol: null,
          departament: null,
          subdepartament: null,
          area: null,
        });
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
};
const RoutersMemo = React.memo(Routers);

// En tu componente App
const App = () => {
  const authState = useContext(AuthContext);

  return (
    <div>
      {authState !== null ? (
        <RoutersMemo
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

