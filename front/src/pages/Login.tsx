import { useState } from "react";
import LoadButton from "../components/LoadButton";
import { Link, useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";

function Login() {
  // UseNavigate
  const navigate = useNavigate();
  // UseState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  // UseRequest
  const { post } = useRequest();

  // Functions
  function handleLogin() {
    setIsButtonLoading(true);
    post(
      "login/",
      {
        username: username,
        password: password,
      },
      false,
      true
    ).then((res) => {
      if (res !== null) {
        navigate("/");
      }
      setIsButtonLoading(false);
    });
  }

  // Render
  return (
    <div className="page grid grid-cols-1 w-full place-items-center space-y-8">
      <h1 className="text-3xl font-medium col-span-1 text-center mt-10">
        Login to Jupido, your favorite TodoList!
      </h1>
      {/*username  */}
      <input
        type="text"
        placeholder="Username"
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      {/* password*/}
      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <LoadButton
        onClick={handleLogin}
        isLoading={isButtonLoading}
        loaderColor="white"
        size={25}
        className="loading-button w-[80%] max-w-[500px] text-lg "
      >
        Login
      </LoadButton>
      <Link
        to="/register"
        className="text-sm text-gray-500 flex items-center gap-1"
      >
        Don't have an account? <p className="underline">Register here!</p>
      </Link>
      <footer className="fixed left-0 right-0 gap-5 flex flex-row items-center justify-center bottom-3 text-center text-gray-500 text-sm">
        <Link to="https://boriz.gitbook.io/jupido">Docs</Link>
      </footer>
    </div>
  );
}

export default Login;
