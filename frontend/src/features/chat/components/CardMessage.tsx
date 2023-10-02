import { useMemo } from "react";
import { useAuthentication } from "../../../hooks/useAuthentication";

type CardMessageProps = {
    type: 'FILE' | 'TEXT';
    message: string | null;
    sender?: string | null;
    date: Date;
    username?: string | null;
};

export function CardMessage({
    message,
    date,
    sender,
    username,
}: CardMessageProps) {
    const { user } = useAuthentication();
    
    const isMyMessage = useMemo(() => {
        return user?.email === sender;
    }, [user, sender]);

    const formattedDate = useMemo(() => {
        return date?.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    }, [date]);

    return (
    <li className={isMyMessage ? 'me' : 'you'}>
        <div className="entete">
            <span className={`status ${isMyMessage ? 'green' : 'blue'}`}></span>
            <h2>{username}</h2>
            <h3>{formattedDate}</h3>
        </div>
        <div className="triangle"></div>
        <div className="message">
            {message}
        </div>
    </li>
    );
}