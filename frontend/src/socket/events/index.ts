import { EventMessageMapping } from "../events.message.enum";
import { EventSubscribeMapping } from "../events.subscribe.enum";
import chatEvent from "./chatEvent";

export default [
    {
        callback: chatEvent,
        eventSubscribeMapping: EventSubscribeMapping.CHAT,
        eventMessageMapping: EventMessageMapping.CHAT,
    }
]