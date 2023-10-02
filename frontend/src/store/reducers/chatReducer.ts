import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MessageResponseDTO } from "../../services/types/chat";

export type ChatReducerType = {
    messages?: MessageResponseDTO[];
    users: any[];
    receiver?: string | null;
    error: any;
}

const initialState: ChatReducerType = {
    messages: [],
    users: [],
    error: null,
    receiver: null
};

const chatReducer = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<MessageResponseDTO[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<MessageResponseDTO>) => {
            if (state.messages) {
                state.messages.push(action.payload);
            } else {
                state.messages = [action.payload];
            }
        },
        setReceiver: (state, action: PayloadAction<string>) => {
            state.receiver = action.payload;
        },
        setUsers: (state, action: PayloadAction<any[]>) => {
            state.users = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }, 
        clearError: (state) => {
            state.error = null;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        clearUsers: (state) => {
            state.users = [];
        }
    }
});

export const chatActions = chatReducer.actions;

export default chatReducer.reducer;