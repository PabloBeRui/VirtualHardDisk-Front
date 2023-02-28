import { useState, useEffect } from "react";
import { useTokenContext } from "../contexts/TokenContext";

// El custom hook useEntries carga las entries de la API y nos retorna un objeto con las entries, loading y errorMessage
const useFiles = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useTokenContext();

  // El effect se ejecuta después del primer render
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Cuando empezamos a hacer el fetch, cambiamos el estado loading a true
        setLoading(true);

        // Hacemos el fetch y recogemos la respuesta del servidor
        const res = await fetch("http://localhost:4000/files", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Nos traemos el body de la respuesta
        const body = await res.json();
        // Si la respuesta no viene bien, lanzamos un error con el mensaje que viene de la API
        if (!res.ok) {
          throw new Error(body.message);
        }
        // Cargamos los datos de las entries en el estado de entries
        setFiles(body.data.items);
      } catch (error) {
        // Si salta algún error, metemos el mensaje en el estado errorMessage
        setErrorMessage(error.message);
      } finally {
        // Al finalizar el fetch, cambiamos loading a false
        setLoading(false);
      }
    };

    fetchFiles();
  }, [token]);

  return { files, errorMessage, loading };
};

export default useFiles;
