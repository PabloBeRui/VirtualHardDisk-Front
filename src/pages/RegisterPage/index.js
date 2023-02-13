import "./style.css";

//Components
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import RegisterForm from "../../components/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="registerPage">
      <Header />
      <RegisterForm />
      <Footer />
    </section>
  );
};

export default RegisterPage;
