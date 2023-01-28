import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import './ProjectList.css'
import translation from '../translations/translation.json'

export default function ProjectList({ projects, lang }) {
    
    return (
        <div className='project-list'>
            {projects.length === 0 && <p>{translation[lang].noProjectsMessage}</p>}
            {projects.map(project => (
                <Link
                    to={`/projects/${project.id}`}
                    key={project.id}>
                    <h4>{translation[lang].task}: {project.name}</h4>
                    <p>{translation[lang].dueDate}: {project.dueDate.toDate().toDateString()}</p>
                    <div className='assigned-to'>
                        <h4>{translation[lang].assignedTo}:</h4>
                        <ul>
                            {project.assignedUsersList.map(user => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL} />
                                    <span>{user.displayName}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
    )
}
