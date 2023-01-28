import { useState } from "react";
import fetcher from "../lib/fetcher";

const useLogin = () => {
  const [error, setError] = useState("");

  const login = async (password: string) => {
    setError("");
    const data = await fetcher({
      url: "/auth/login",
      method: "post",
      body: { password },
    });
    if (data?.token) {
      localStorage.setItem("authToken", data.token);
      return data?.token;
    } else {
      setError(data.message);
    }
  };

  return {
    error,
    login,
  };
};

export default useLogin;
