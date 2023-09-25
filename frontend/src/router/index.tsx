import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/login";
import { Register } from "../features/register";
import { Logout } from "../features/logout";
import { Chat } from "../features/chat";
import { PrivateRouter } from "./PrivateRouter";

export function Router() {
  return (
        <Routes>
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/chat" element={<PrivateRouter component={<Chat />} />} />
            <Route path="*" element={<Navigate to="/signin" />} />
            <Route path="/" element={<PrivateRouter component={<Chat />} />} />
        </Routes>
  )
}