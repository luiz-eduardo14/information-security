import { useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import "../style/chat/style.css";
import { ChatConversation } from "./components/ChatConversation";
import { PersonCardProvider } from "./components/PersonCardProvider";
import { Search } from "./components/Search";
import useFetch from "../../hooks/useFetch";
import { getAllUsersRequest } from "../../services/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { chatActions } from "../../store/reducers/chatReducer";
import { useAuthentication } from "../../hooks/useAuthentication";

export function Chat() {

	const socket = useSocket();
	const [textArea, setTextArea] = useState<string | null>(null);

	const [{data: personList, isLoading}] = useFetch(getAllUsersRequest, null, true, []);

	const receiver = useSelector((state: any) => state.chat.receiver);

	const dispatch = useDispatch();

	const { user } = useAuthentication();

    return (
	<div style={{
		paddingTop: "50px",
	}}>
		<div id="container">
			<aside>
				<Search />
				{
					!isLoading && personList && (
						<PersonCardProvider 
						data={personList} 
						setReceiver={(email: string) => {
							dispatch(chatActions.setReceiver(email));
						}} 
						/>
					)
				}
			</aside>
			<main>
				<ChatConversation />
				<footer style={{
					display: "flex",
					flexDirection: "row",
					textAlign: "center",
					justifyContent: "center",
					alignItems: "center",
				}}>
					<textarea 
					onChange={(e) => setTextArea(e.target.value)}
					style={{
						width: "100%",
					}} placeholder="Write your message"></textarea>
					<a 
					onClick={() => {
						if (socket?.connected) {
							console.log('send message');
							socket.publish({
								destination: '/app/chat/' + receiver,
								body: JSON.stringify({
									message: textArea,
									sender: user?.email,
									name: user?.firstName,
								}),
							});
							dispatch(chatActions.addMessage({
								message: textArea,
								sender: user?.email,
								name: user?.firstName,
							}));
						}
					}}
					style={{
						textAlign: "center",
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						cursor: "pointer",
					}}>Send</a>
				</footer>
			</main>
		</div>
	</div>
    )
}