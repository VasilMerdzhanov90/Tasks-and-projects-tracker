import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import DueDateFilter from './DueDateFilter';
import translation from '../../translations/translation.json';

export default function Dashboard({ language }) {
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
                case 'всички':
                    return true
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
                case 'разработка':
                    return document.category === 'development';
                case 'дизайн':
                    return document.category === 'design';
                case 'продажби':
                    return document.category === 'sales';
                case 'маркетинг':
                    return document.category === 'marketing';
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

    if (language) {
        return (
            <div>
                <h2 className='page-title'>{translation[language].dashboardTitle}</h2>
                {error && <p className='error'>{error}</p>}

                {documents &&
                    <ProjectFilter
                        currentFilter={currentFilter}
                        changeFilter={changeFilter}
                        language={language} />
                }

                {currentFilter === 'date' ||
                    currentFilter === 'дата' &&
                    <DueDateFilter projects={documents}
                        projectsSetter={projectsSetter}
                    />
                }

                {filteredByDate &&
                    <ProjectList language={language} projects={filteredByDate} />
                }
                {projects && !filteredByDate &&
                    <ProjectList language={language} projects={projects} />
                }
            </div>
        )
    } else {
        return <p>Loading</p>
    }

}
