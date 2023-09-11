import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "../features/login";
import { Register } from "../features/register";

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
    }
]);

export function Router() {
  return (
    <RouterProvider router={router} />
  )
}