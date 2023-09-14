import { PersonCard, PersonCardProps } from "./PersonCard"

type PersonCardProviderProps = {
    data: PersonCardProps[];
}

export function PersonCardProvider({
    data
}: PersonCardProviderProps){
    return (
        <ul>
            {data.map((item, index) => (
                <PersonCard
                    key={index}
                    image={item.image}
                    name={item.name}
                    status={item.status}
                    statusColor={item.statusColor}
                />
            ))}
        </ul>
    )
}