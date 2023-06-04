import { useEffect, useState } from "react";
import LoadButton from "../components/LoadButton";
import { Link, useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";

function Register() {
  // UseNavigate
  const navigate = useNavigate();
  // UseState
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showError, setShowError] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  //useRequest
  const { post } = useRequest();

  // useEffect
  useEffect(() => {
    if (password !== passwordConfirmation && passwordConfirmation !== "") {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [password, passwordConfirmation]);

  // Functions
  function handleRegister() {
    setIsButtonLoading(true);
    post(
      "register/",
      {
        password: password,
        password2: passwordConfirmation,
        username: username,
        email: email,
      },
      false,
      true
    ).then((res) => {
      if (res !== null) navigate("/");
      setIsButtonLoading(false);
    });
  }

  // Render
  return (
    <div className="page grid grid-cols-1 w-full place-items-center space-y-8">
      <h1 className="text-3xl font-medium col-span-1 text-center mt-10">
        Register to Jupido, your new TodoList!
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
      {/* email */}
      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      {/* password confirmation */}
      <input
        type="password"
        placeholder="Password Confirmation"
        className="input"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        required
      />
      {/* error */}
      {showError && (
        <p className="text-red-500 text-center mt-5">Password don't match!</p>
      )}
      <LoadButton
        onClick={handleRegister}
        isLoading={isButtonLoading}
        loaderColor="white"
        size={25}
        className="loading-button w-[80%] max-w-[500px] text-lg "
      >
        Register
      </LoadButton>
      <Link
        to="/login"
        className="text-sm text-gray-500 flex items-center gap-1"
      >
        Already have an account? <p className="underline">Login here!</p>
      </Link>
      <footer className="fixed left-0 right-0 gap-5 flex flex-row items-center justify-center bottom-3 text-center text-gray-500 text-sm">
        <Link to="https://boriz.gitbook.io/jupido">Docs</Link>
      </footer>
    </div>
  );
}

export default Register;
