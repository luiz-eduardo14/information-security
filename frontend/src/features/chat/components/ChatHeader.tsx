const urlPersonCard = 'https://writingcenter.fas.harvard.edu/sites/hwpi.harvard.edu/files/styles/os_files_xxlarge/public/writingcenter/files/person-icon.png?m=1614398157&itok=Bvj8bd7F';

type ChatHeaderProps = {
	name?: string;
	messagesCount: number;
}

export function ChatHeader({
	messagesCount,
	name
}: ChatHeaderProps) {
    return (
        <header>
				<img src={urlPersonCard} height={55} width={55}/>
				<div>
					<h2>Chat with {name}</h2>
					<h3>already {messagesCount} messages</h3>
				</div>
				<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/ico_star.png" alt=""/>
        </header>
    )
}