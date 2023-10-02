import api from "./api";
import { ChatResponseDTO } from "./types/chat";

export const getAllMessagesByReceiverRequest = (_param: null, sender: string) => 
        api.get<ChatResponseDTO>(`/chat/messages/${sender}`);