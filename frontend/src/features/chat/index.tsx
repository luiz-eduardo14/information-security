import "../style/chat/style.css";
import { ChatConversation } from "./components/ChatConversation";
import { ChatHeader } from "./components/ChatHeader";
import { PersonCardProvider } from "./components/PersonCardProvider";
import { Search } from "./components/Search";

const PersonCardDataMock = [
    {
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_01.jpg",
        name: "Prénom Nom",
        status: "offline",
        statusColor: "orange"
    }, 
    {
        image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_02.jpg",
        name: "Prénom Nom",
        status: "online",
        statusColor: "green"    
    },
    
];

export function Chat() {

    return (
	<div style={{
		paddingTop: "50px",
	}}>
		<div id="container">
		<aside>
			<Search />
			<PersonCardProvider data={PersonCardDataMock} /> 
		</aside>
		<main>
			<ChatHeader />
			<ChatConversation />
			<footer>
				<textarea placeholder="Type your message"></textarea>
				<a href="#">Send</a>
			</footer>
		</main>
	</div>
</div>
    )
}