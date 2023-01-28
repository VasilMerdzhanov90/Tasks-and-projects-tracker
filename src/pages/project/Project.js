import './Project.css'

import React, { useEffect, useState } from 'react'
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';
import { useParams } from 'react-router-dom';

export default function Project({ currentUser }) {

	const [lang, setLang] = useState(null);

	useEffect(() => {
		if (currentUser) {
			setLang(currentUser.userSettings.language)
		}
		console.log(lang)
	}, [currentUser, lang])
	const { id } = useParams();

	const { document, error } = useDocument('projects', id);

	return (
		<div>
			{error && <p className='error'>{error}</p>}
			{!document && <div className='loading'>Loading...</div>}
			{document &&
				<div className='project-details'>
					{lang && <ProjectSummary project={document} lang={lang} />}
					{lang && <ProjectComments project={document} lang={lang} />}
				</div>
			}
		</div>
	)
}
