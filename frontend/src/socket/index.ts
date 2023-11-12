import { IMessage } from "@stomp/stompjs";
import chat from "./chat";

interface SocketEvent {
    callback: (socketResponse: IMessage) => void;
    eventSubscribeMapping: string;
    eventMessageMapping: string;
}

export default [
    chat
] as SocketEvent[];