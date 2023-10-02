import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

export function useSocket() {
    const socket = useContext(SocketContext);
    return socket;
}