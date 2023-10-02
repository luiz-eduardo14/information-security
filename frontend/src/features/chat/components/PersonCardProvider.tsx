import { useEffect } from "react";
import { UserDTO } from "../../../services/types/user";
import { PersonCard } from "./PersonCard"

type PersonCardProviderProps = {
    data: UserDTO[];
    setReceiver: (email: string) => void;
}

export function PersonCardProvider({
    data,
    setReceiver
}: PersonCardProviderProps){

    useEffect(() => {
        if (data && data?.length === 1) {
            setReceiver(data[0].email);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <ul>
            {data.map((item, index) => (
                <PersonCard
                    key={index}
                    name={item.firstName}
                    status="online"
                    statusColor="green"
                    onClick={() => setReceiver(item.email)}
                />
            ))}
        </ul>
    )
}