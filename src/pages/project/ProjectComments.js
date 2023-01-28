import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import translation from '../../translations/translation.json'

import { v4 as uuidv4 } from 'uuid';
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import { formatDistanceToNow } from "date-fns";



export default function ProjectComments({ project, lang }) {

    const [newComment, setNewComment] = useState('');
    const { updateDocument, response } = useFirestore('projects')
    const { user } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: uuidv4()
        }
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if (!response.error) {
            setNewComment('')
        }
    }

    return (
        <div className="project-comments">
            <h4>{translation[lang].taskComments}</h4>
            <ul>
                {project.comments.length > 0 && project.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="add-comment">
                <label>
                    <textarea
                        placeholder={translation[lang].placeholderComments}
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">{translation[lang].addComment}</button>
            </form>
        </div>
    )
}
