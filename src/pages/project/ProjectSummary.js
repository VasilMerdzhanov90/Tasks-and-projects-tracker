import { useNavigate } from 'react-router-dom';
import Avatar from '../../components/Avatar'
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import translation from '../../translations/translation.json'


export default function ProjectSummary({ project, lang }) {
    const { deleteDocument, finishDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const projectDate = new Date(project.dueDate.seconds * 1000);

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
                <h2 className="page-title">{translation[lang].task}: {project.name}</h2>
                <p>{translation[lang].createdBy}: {project.createdBy.displayName}</p>
                <p className="due-date">
                    {translation[lang].dueDate}: {project.dueDate.toDate().toDateString()}
                </p>
                <p className="details">
                    {translation[lang].details}: <br />
                    {project.details}
                </p>
                {project.imgUrl && <img className='task-image' src={project.imgUrl} alt="task image" />}
                <h4>{translation[lang].assignedTo}:</h4>
                <div className='assigned-users'>
                    {project.assignedUsersList.map(user => (
                        <div key={user.id}>
                            <Avatar src={user.photoURL} />
                        </div>
                    ))}
                </div>
            </div>
            {user.uid === project.createdBy.id && < button onClick={handleClick} className='btn'>{translation[lang].deleteTask}</button>}
            {!project.finished
                ? <button
                    className='btn'
                    onClick={handleFinish}>
                    {translation[lang].markedAsCompleted}
                </button>
                : <p className='error'>{translation[lang].completedBy} {project.finishedBy.displayName.toUpperCase()}</p>
            }
        </div >
    )
}
