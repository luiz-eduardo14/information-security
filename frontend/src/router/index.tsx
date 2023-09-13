import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../features/login";
import { Register } from "../features/register";
import { Logout } from "../features/logout";

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
    } 
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  )
}