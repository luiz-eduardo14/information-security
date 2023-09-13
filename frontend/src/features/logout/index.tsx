import { Navigate } from "react-router";
import { Storage } from "../../utils";

export function Logout() {
    localStorage.removeItem(Storage.TOKEN);
    return <Navigate to="/signin" />
}