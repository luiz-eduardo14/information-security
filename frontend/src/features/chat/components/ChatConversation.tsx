import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { getAllMessagesByReceiverRequest } from "../../../services/chat";
import { CardMessage } from "./CardMessage";
import { ChatHeader } from "./ChatHeader";
import { useDispatch } from "react-redux";
import { ChatReducerType, chatActions } from "../../../store/reducers/chatReducer";
import { useSelector } from "react-redux";

export function ChatConversation() {

	const dispatch = useDispatch();

	const { receiver, messages } = useSelector((state: any) => state.chat) as ChatReducerType;

	const [{
		data: personMessages,
		isLoading,
	}, searchMessages] = useFetch(
		getAllMessagesByReceiverRequest, 
		null, 
		false, 
		null,
		null,
		response => {
			if (response.ok && response.data) {
				dispatch(chatActions.setMessages(response.data.messages));
			}
		}
	);

	useEffect(() => {
		if (receiver) {
			searchMessages(receiver);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [receiver]);

    return (
		<>
			<ChatHeader 
				name={personMessages?.name} 
				messagesCount={messages?.length ?? 0} 
			/>
			<ul id="chat">
				{
					personMessages 
						&& 
					!isLoading
						&&
					messages?.map((item, index) => (
							<CardMessage
								date={new Date()}
								message={item.message}
								sender={item.sender}
								type="TEXT"
								username={item.name}
								key={index}
							/>
					))
				}
			</ul>
		</>
    );
}