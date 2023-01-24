import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import './ProjectList.css'


export default function ProjectList({ projects }) {
    return (
        <div className='project-list'>
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map(project => (
                <Link
                    to={`/projects/${project.id}`}
                    key={project.id}>
                    <h4>Task: {project.name}</h4>
                    <p>Due by: {project.dueDate.toDate().toDateString()}</p>
                    <div className='assigned-to'>
                        <h4>Assigned to:</h4>
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
