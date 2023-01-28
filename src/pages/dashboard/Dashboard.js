import './Dashboard.css'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList';
import ProjectFilter from './ProjectFilter';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import DueDateFilter from './DueDateFilter';
import translation from '../../translations/translation.json'

export default function Dashboard({ currentUser }) {
    const { user } = useAuthContext();

    const { documents, error } = useCollection('projects', ['finished', '==', false]);


    const [currentFilter, setCurrentFilter] = useState('all');
    const [filteredByDate, setFilteredByDate] = useState(null);
    const [lang, setLang] = useState(null);

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    useEffect(() => {
        if (currentUser) {
            setLang(currentUser.userSettings.language)
        }
    }, [currentUser, lang])

    const projects = documents
        ? documents.filter((document) => {
            switch (currentFilter) {
                case 'всички':
                case 'all':
                    return true
                case 'assigned':
                case 'назначени':
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
            setFilteredByDate(null)
        } else {
            setFilteredByDate(p);
        }
    }

    return (
        <div>
            {lang  && <h2 className='page-title'>{translation[lang].dashboardTitle}</h2>}
            {error && <p className='error'>{error}</p>}

            {documents &&
                <ProjectFilter
                    currentFilter={currentFilter}
                    changeFilter={changeFilter}
                    lang={lang}
                />
            }

            {currentFilter === 'date' || currentFilter === 'дата' &&
                <DueDateFilter projects={documents}
                    projectsSetter={projectsSetter}
                />}

            {filteredByDate &&
                <ProjectList projects={filteredByDate} lang={lang} />
            }

            {projects && !filteredByDate &&
                <ProjectList projects={projects} lang={lang} />
            }



        </div>
    )
}
