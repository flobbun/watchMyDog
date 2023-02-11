import { useState } from "react";
import { StorageVars } from "../constants/StorageVars";
import fetcher from "../lib/fetcher";
import { setObject } from "../lib/storageManagement";

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
      setObject(StorageVars.TOKEN, data.token);
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
