import { configureStore } from "@reduxjs/toolkit";
import chat from "./reducers/chatReducer";

const store = configureStore({
    reducer: {
        chat
    }
});

export default store;