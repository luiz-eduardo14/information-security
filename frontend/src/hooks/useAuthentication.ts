import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthentication = () => {
    const {
      authenticated,
      user,
      logout,
      saveToken,
      token,
      fetchMe,
      ready,
    } = useContext(AuthContext);
    return {
      authenticated,
      user,
      logout,
      saveToken,
      token,
      fetchMe,
      ready
    };
  };