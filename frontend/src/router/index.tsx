import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../features/login";
import { Register } from "../features/register";
import { Logout } from "../features/logout";
import { Chat } from "../features/chat";

const router = createBrowserRouter([
    {
        path: "/signin",
        Component: Login
    },
    {
        path: "/signup",
        Component: Register
    },
    {
        path: "*",
        element: <Navigate to="/signin" />
    },
    {
        path: "/logout",
        Component: Logout
    }, 
    {
        path: "/chat",
        Component: Chat
    }
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  )
}