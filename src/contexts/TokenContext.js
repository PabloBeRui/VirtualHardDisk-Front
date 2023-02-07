import { createContext, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";

// Creamos un contexto para hacer el token accesible a todos los componentes de la App. El TokenContext tiene una propiedad .Provider que es un componente. A este componente hay que pasarle la prop value con el valor que queramos y todos los componentes hijos de él van a tener acceso a dicho valor
export const TokenContext = createContext();

// Creamos un componente que crea un estado para el token y pinta el Provider pasándole como valor el token y la función para cambiarlo. A este componente le pasaremos por la prop children el componente "App" para que todos nuestros componentes tengan acceso al value del Provider (ver index.js)
export const CustomTokenContextProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  return useContext(TokenContext);
};

// export { TokenContext, CustomTokenContextProvider };
