import { IMessage } from "@stomp/stompjs";
import store from "../../store";
import { chatActions } from "../../store/reducers/chatReducer";
import { MessageRequestDTO } from "../../services/types/chat";

function chatEvent(socketResponse: IMessage): void {
    console.log(socketResponse);
    const value = JSON.parse(socketResponse.body) as MessageRequestDTO;
    console.log(value);
    
    store.dispatch(chatActions.addMessage({
        message: value.message,
        sender: value.sender,
        name: value.name
    }));
}

export default chatEvent;