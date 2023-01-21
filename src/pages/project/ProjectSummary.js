import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore'


export default function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        deleteDocument(project.id);
        navigate('/');
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">Task: {project.name}</h2>
                <p>Created by: {project.createdBy.displayName}</p>
                <p className="due-date">
                    Task due by: {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    Details: <br />
                    {project.details}
                </p>
                <h4>Task assigned to:</h4>
                <div className='assigned-users'>
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && < button onClick={handleClick} className='btn'>Mark as Completed</button>}
        </div >
    )
}
