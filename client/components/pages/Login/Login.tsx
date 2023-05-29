import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoutePaths from "../../../constants/RoutePaths";
import useLogin from "../../../hooks/useLogin";
import s from "./Login.module.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const { error, login } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(password);
      navigate(RoutePaths.HOME)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className={s.root}>
      <h1 className="text-6xl">Login</h1>
      <p className="text-2xl">In order to use this app you need to provide a secret password</p>
      <input
        className="rounded-sm text-lg text-black p-2 w-full text-center"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password..."
      />
      {error && <p className="text-red-500 text-2xl">{error} </p>}
      <button className="bg-gray-400 hover:scale-105 duration-75 p-2 rounded-sm text-2xl w-2/3" type="submit">Submit</button>
    </form>
  );
};

export default Login;
