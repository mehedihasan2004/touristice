import { Button } from "flowbite-react";
import React, { useContext } from "react";
import Img from "../../assets/signup.webp";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  const { login, providerLogin, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();
  useTitle("Login");
  const googleProvider = new GoogleAuthProvider();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        setError("");
        const user = result.user;
        const currentUser = {
          email: user.email,
        };
        fetch("https://touristics-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
          })
          .catch((err) => console.error("Error", err));

        form.reset();
      })
      .catch((err) => {
        console.error("Error", err);
        setError(err.message);
      });
  };

  const googleLogin = () => {
    providerLogin(googleProvider)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const currentUser = {
          email: user?.email,
        };
        fetch("https://touristics-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("token", data.token);
            navigate(from, { replace: true });
          })
          .catch((err) => console.error("Error", err));
        // navigate(from, { replace: true });
      })
      .catch((err) => console.error("Error", err));
  };

  return (
    <div className="grid grid-cols-2 mx-60">
      <div>
        <img src={Img} alt="" />
        <Link to="/signup">
          <p className="font-bold text-center">
            <u>Create an account</u>
          </p>
        </Link>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-10">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full my-4"
            type="email"
            name="email"
            placeholder="Enter E-mail"
          />
          <input
            className="w-full my-4"
            type="password"
            name="password"
            placeholder="Password"
          />
          <hr className="my-4" />
          <div className="flex justify-between items-center">
            <p className="text-red-500">{error}</p>
            <Button type="submit" gradientMonochrome="teal">
              Sign In
            </Button>
          </div>
        </form>
        <hr className="my-4" />
        <div className="flex justify-center mt-10">
          <Link
            onClick={googleLogin}
            className="flex justify-center items-center border-2 border-sky-400 bg-sky-100 hover:bg-sky-200 px-3 rounded-2xl"
          >
            <FcGoogle className="text-2xl" />
            <p className="font-bold ml-1">Continue With Google</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
