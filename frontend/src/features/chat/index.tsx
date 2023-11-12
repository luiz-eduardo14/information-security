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
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { Toast } from "../../utils/Toast";

export function Chat() {

	const socket = useSocket();
	
	const [textArea, setTextArea] = useState<string | null>(null);

	const [{data: personList, isLoading}] = useFetch(getAllUsersRequest, null, true, []);

	const receiver = useSelector((state: any) => state.chat.receiver);

	const dispatch = useDispatch();

	const { user } = useAuthentication();

	const [modalIsOpen, setIsOpen] = useState(false);

	const form = useForm<{
		signMessage: boolean;
	}>();

	const sendMessageCallback = (formValues: {
		signMessage: boolean;
	}) => {
		if (socket?.connected && user) {
			socket.publish({
				destination: '/app/chat/' + receiver,
				body: JSON.stringify({
					message: textArea,
					sender: user.email,
					name: user.firstName,
					signMessage: formValues.signMessage,
				}),
			});
			dispatch(chatActions.addMessage({
				message: textArea,
				sender: user.email,
				name: user.firstName,
			}));
			setIsOpen(false);
			setTextArea(null);
		}
	}

    return (
	<div style={{
		paddingTop: "50px",
	}}>
		<Modal isOpen={modalIsOpen} style={{
			content: {
				width: '600px',
				height: '200px',
				left: 0,
				right: 0,
				margin: '0 auto'
			},
			overlay: {
				backgroundColor: 'rgba(0,0,0,0.5)',
			},
		}}>
				<div className="form login">
					<form onSubmit={form.handleSubmit(sendMessageCallback)}>
						<div style={{
							display: "flex",
							gap: "8px",
						}}>
							<input type="checkbox" {...form.register("signMessage")} />
							<label>
								Gostaria de assinar essa mensagem?
							</label>
						</div>
						<div>
							<button onClick={() => setIsOpen(false)}>Cancelar</button>
							<button type="submit">Enviar</button>
						</div>
					</form>
				</div>
		</Modal>
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
						value={textArea as any}
						style={{
							width: "100%",
						}} placeholder="Write your message">
					</textarea>
					<a 
					onClick={() => {
						if (!textArea && !textArea?.trim()) {
							Toast.showErrorMessage('Message cannot be empty');
							return;
						}
						setIsOpen(true);
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