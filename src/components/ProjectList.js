import './ProjectList.css';
import { Link } from 'react-router-dom';
import Avatar from './Avatar';

import translation from '../translations/translation.json';

export default function ProjectList({ projects, language }) {

    return (
        <div className='project-list'>
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map(project => (
                <Link
                    to={`/projects/${project.id}`}
                    key={project.id}>
                    <h4>{translation[language].task}: {project.name}</h4>
                    <p>{translation[language].dueDate}: {project.dueDate.toDate().toDateString()}</p>
                    <div className='assigned-to'>
                        <h4>{translation[language].assignedTo}:</h4>
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
