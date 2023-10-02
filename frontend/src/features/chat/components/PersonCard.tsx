export type PersonCardProps = {
    name: string;
    status: string;
    statusColor: string;
    image?: string;
    onClick(): void;
}

export function PersonCard({
    image,
    name,
    status,
    statusColor,
    onClick,
}: PersonCardProps) {
    return (
        <li onClick={onClick}>
            <img src={image ?? 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt="" width={55} height={55}/>
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