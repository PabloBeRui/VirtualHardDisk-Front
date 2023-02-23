import "./style.css";
import "react-toastify/dist/ReactToastify.css";

//React Components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//Custom Components
import Button from "../Button";

const RegisterForm = () => {
  //Estados para controlar los inputs del formularios
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <section className="registerMainSection">
      <form
        className="registerForm"
        onSubmit={async (event) => {
          try {
            // Cancelamos la acción por defecto del formulario
            event.preventDefault();

            // Hacemos una petición POST a la API y enviamos en el body un JSON con los datos que ha introducido el usuario en el formulario. IMPORTANTE mandar el header Content-Type indicando que el body es un JSON
            const res = await fetch("http://localhost:4000/users", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, email, password }),
            });

            // Accedemos al body de la respuesta
            const body = await res.json();

            // Si la respuesta viene mal, lanzamos un error con el mensaje que viene en el body
            if (!res.ok) {
              throw new Error(body.message);
            }
            navigate("/");
            toast.success(
              "¡You have registered successfully! Now you can log in"
            );
          } catch (error) {
            // Si salta algún error lo sacamos por consola y se lo mostramos al usuario en una alerta
            console.error(error);
            toast.error(error.message);
          }
        }}
      >
        <h1>Welcome!</h1>
        <input
          id="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Username"
        />
        <input
          id="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          placeholder="Email"
        />
        <input
          id="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          type="password"
          placeholder="******"
        />
        <Button text="Register" />
      </form>
    </section>
  );
};

export default RegisterForm;
