export interface MessageResponseDTO {
    sender?: string | null;
    message: string | null;
    name?: string | null;
}

export interface MessageRequestDTO {
    sender: string;
    message: string;
    receiver: string;
    name: string;
    date: string;
}

export interface ChatResponseDTO {
    messages: MessageResponseDTO[];
    sender: string;
    receiver: string;
    name: string;
}