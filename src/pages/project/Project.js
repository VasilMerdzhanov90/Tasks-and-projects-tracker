import './Project.css'

import React from 'react'
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from './ProjectSummary';
import ProjectComments from './ProjectComments';
import { useParams } from 'react-router-dom';

export default function Project({ language }) {

	const { id } = useParams();

	const { document, error } = useDocument('projects', id);

	if (language) {

		return (
			<div>
				{error && <p className='error'>{error}</p>}
				{!document && <div className='loading'>Loading...</div>}
				{document &&
					<div className='project-details'>
						<ProjectSummary project={document} language={language} />
						<ProjectComments project={document} language={language} />
					</div>
				}
			</div>
		)
	} else {
		return <p>Loading</p>
	}
}
