import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ChatReducerType = {
    messages: any[];
    users: any[];
    error: any;
}

const initialState: ChatReducerType = {
    messages: [],
    users: [],
    error: null
};

const chatReducer = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setMessages: (state, action: PayloadAction<any[]>) => {
            state.messages = action.payload;
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