import { PropsWithChildren, ReactNode } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import { Navigate } from "react-router";

type PrivateRouterProps = PropsWithChildren<{
    component: ReactNode;
}>;

export function PrivateRouter({ component }: PrivateRouterProps) {

    const { authenticated, logout, ready } = useAuthentication();

    if (!ready) {
        return null;
    }

    if (!authenticated) {
        logout();
        return <Navigate to="/signin" />;
    }

    return component;
}