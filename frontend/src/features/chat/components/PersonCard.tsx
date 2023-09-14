export type PersonCardProps = {
    name: string;
    status: string;
    statusColor: string;
    image: string;
}

export function PersonCard({
    image,
    name,
    status,
    statusColor
}: PersonCardProps) {
    return (
        <li>
            <img src={image} alt=""/>
            <div>
                <h2>{name}</h2>
                <h3>
                    <span className={"status " + statusColor ?? 'orange'}></span>
                    {status}
                </h3>
            </div>
        </li>
    )
}