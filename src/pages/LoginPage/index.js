//React Components
import { useTokenContext } from "../../contexts/TokenContext";
import { Navigate } from "react-router-dom";

//Custom Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LoginForm from "../../components/LoginForm";

const LoginPage = () => {
  const { token } = useTokenContext();

  if (token) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="loginPage">
      <Header />
      <LoginForm />
      <Footer />
    </section>
  );
};

export default LoginPage;
