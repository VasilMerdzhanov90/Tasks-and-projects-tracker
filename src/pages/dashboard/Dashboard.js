import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import DueDateFilter from './DueDateFilter';


export default function Dashboard() {

    const { user } = useAuthContext();

    const { documents, error } = useCollection('projects', ['finished', '==', false]);


    const [currentFilter, setCurrentFilter] = useState('all');
    const [filteredByDate, setFilteredByDate] = useState(null);

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents
        ? documents.filter((document) => {
            switch (currentFilter) {
                case 'all':
                    return true
                case 'assigned to me':
                    let assignedToMe = false;
                    document.assignedUsersList.forEach((u) => {
                        if (user.uid === u.id) {
                            assignedToMe = true;
                        }
                    });
                    return assignedToMe;
                case 'development':
                case 'design':
                case 'sales':
                case 'marketing':
                    return document.category === currentFilter;
                default:
                    return true
            }
        })
        : null;

    const projectsSetter = (p) => {
        if (p === 'reset') {
            setFilteredByDate(null);
            return
        }
        setFilteredByDate(p);
    }

    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <p className='error'>{error}</p>}

            {documents &&
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter} />
            }

            {currentFilter === 'date' &&
                <DueDateFilter projects={documents}
                    projectsSetter={projectsSetter}
                />
            }

            {filteredByDate &&
                <ProjectList projects={filteredByDate} />
            }
            {projects && !filteredByDate &&
                <ProjectList projects={projects} />
            }
        </div>
    )
}
