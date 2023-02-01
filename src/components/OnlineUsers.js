import "./OnlineUsers.css"
import { useCollection } from "../hooks/useCollection"
import Avatar from "./Avatar";
import translation from '../translations/translation.json'


export default function OnlineUsers({ color, language }) {
    const { documents, error } = useCollection('users');

    return (
        <div className="user-list" style={{ backgroundColor: color }}>
            <h2>{translation[language].onlineUsers}</h2>
            {error && <div className="error">{error}</div>}
            {documents && documents.map(user => (
                <div className="user-list-item" key={user.id}>
                    {user.online && <span className="online-user"></span>}
                    {!user.online && <span className="online-user" style={{ backgroundColor: 'red' }}></span>}
                    <span>{user.displayName}</span>
                    <Avatar src={user.photoURL} />
                </div>
            ))}
        </div>
    )
}
