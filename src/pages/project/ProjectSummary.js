import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar'
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore'

import translation from '../../translations/translation.json';

export default function ProjectSummary({ project, language }) {
    const { deleteDocument, finishDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const handleClick = async () => {
        await deleteDocument(project.id)
        navigate('/');
    }

    const handleFinish = async () => {
        const finishedBy = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            finishedAt: timestamp.fromDate(new Date())
        }
        finishDocument(project.id, finishedBy)
    }

    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{translation[language].task}: {project.name}</h2>
                <p>{translation[language].createdBy}: {project.createdBy.displayName}</p>
                <p className="due-date">
                    {translation[language].dueDate}: {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {translation[language].details}: <br />
                    {project.details}
                </p>
                {project.imgUrl && <img className='task-image' src={project.imgUrl} alt="task image" />}
                <h4>{translation[language].assignedTo}:</h4>
                <div className='assigned-users'>
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id &&
                < button onClick={handleClick} className='btn'>
                    {translation[language].deleteTask}
                </button>}
            {!project.finished
                ? <button
                    className='btn'
                    onClick={handleFinish}>
                    {translation[language].markedAsCompleted}
                </button>
                : <p className='error'>{translation[language].completedBy} {project.finishedBy.displayName.toUpperCase()}</p>
            }
        </div >
    )
}
